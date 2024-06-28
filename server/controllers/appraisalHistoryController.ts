import { Request, Response } from "express";
import AppraisalHistoryModel, {
  AppraisalHistory,
} from "../models/appraisaHistory";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import NotificationService from '../services/notificationService';

const createAppraisalHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newAppraisalHistory = new AppraisalHistoryModel(req.body);
    await newAppraisalHistory.save();

    // Update the Employee model with the appraisal history
    const employee = await Employee.findOne({
      empId: newAppraisalHistory.employeeId,
    });
    if (employee) {
      employee.appraisalHistory.push(newAppraisalHistory);

      let notificationMessage = '';
      let notificationTitle = '';

      // Check total score and update status
      if (
        newAppraisalHistory.totalScore &&
        newAppraisalHistory.totalScore >= 80
      ) {
        newAppraisalHistory.status = "accepted";
        employee.appraisalHistory[employee.appraisalHistory.length - 1].status =
          "accepted";
        // Update promotion date and title
        employee.title = newAppraisalHistory.nextLevel ?? ""; // Or use a default value if appropriate
        employee.rankChanges.push({
          oldRank: employee.position,
          newRank: newAppraisalHistory.nextLevel ?? "",
          date: new Date(),
        });

        notificationTitle = 'Appraisal Accepted';
        notificationMessage = `Your appraisal has been accepted and you have been promoted to ${newAppraisalHistory.nextLevel}.`;

      } else {
        newAppraisalHistory.status = "rejected";
        employee.appraisalHistory[employee.appraisalHistory.length - 1].status =
          "rejected";

          notificationTitle = 'Appraisal Rejected';
          notificationMessage = 'Your appraisal has been rejected.';

      }

      await employee.save();

    // Send notification to the employee about the appraisal status
                  await NotificationService.createNotification(
                    employee._id.toString(),
                    notificationTitle,
                    notificationMessage
                  );
    }

    await newAppraisalHistory.save();

    res
      .status(201)
      .json({
        message: "Appraisal history saved successfully",
        newAppraisalHistory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppraisalHistoryByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;
    // Check if the employee with the given employeeId exists
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Fetch appraisal history for the specified employeeId
    const appraisalHistory = await AppraisalHistoryModel.find({
      employeeId,
    });
    const appraisalHistoryWithEmployeeDetails = await Promise.all(
      appraisalHistory.map(async (history) => {
        try {
          // Include relevant employee details in the appraisal history object

          const latestRankChange =
            employee.rankChanges[employee.rankChanges.length - 1];
          const isAccepted = history.status === "accepted";
          return {
            ...history.toObject(),
            employee: {
              fullName: `${employee.firstName} ${employee.lastName}`,
              position: employee.position,
              promotionDate: isAccepted ? latestRankChange?.date ?? null : null,
            },
          };
        } catch (error) {
          console.error(
            `Error fetching appraisal history for employee with ID ${employeeId}: ${error}`
          );
          return history.toObject();
        }
      })
    );

    res.status(200).json(appraisalHistoryWithEmployeeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAppraisalHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appraisalHistory: AppraisalHistory[] =
      await AppraisalHistoryModel.find();

    // Fetch employee details for each appraisal history in parallel
    const appraisalHistoryWithEmployeeDetails = await Promise.all(
      appraisalHistory.map(async (history) => {
        try {
          const employee: EmployeeDocument | null = await Employee.findOne({
            empId: history.employeeId,
          });

          if (employee && history.status === "accepted") {
            // Include relevant employee details in the appraisal history object
            const latestRankChange =
              employee.rankChanges[employee.rankChanges.length - 1];
            const isAccepted = history.status === "accepted";
            return {
              ...history.toObject(),
              employee: {
                fullName: `${employee.firstName} ${employee.lastName}`,
                position: employee.position,
                promotionDate: isAccepted
                  ? latestRankChange?.date ?? null
                  : null,
              },
            };
          } else {
            console.error(
              `Employee not found or appraisal not accepted for history with ID ${history._id}`
            );
            return null;
          }
        } catch (error) {
          console.error(
            `Error fetching employee for appraisal history with ID ${history._id}: ${error}`
          );
          return null;
        }
      })
    );

    // Filter out null values (employees with no approved appraisals)
    const filteredAppraisalHistoryWithEmployeeDetails =
      appraisalHistoryWithEmployeeDetails.filter((item) => item !== null);

    res.status(200).json(filteredAppraisalHistoryWithEmployeeDetails);
  } catch (error) {
    console.error(`Error fetching appraisal history: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
};
