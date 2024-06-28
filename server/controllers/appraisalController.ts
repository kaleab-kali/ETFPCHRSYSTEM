import { Request, Response } from "express";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import Appraisal, { AppraisalDocument } from "../models/appraisalModel";

export const createAppraisal = async (): Promise<void> => {
  try {
    // Fetch all employees
    const employees: EmployeeDocument[] = await Employee.find().exec();

    // Define the mapping of titles to years required for the next title
    const titleMap: { [title: string]: number } = {
      "Constable": 4,
      "Assistant Sergeant": 3,
      "Deputy Sergeant": 3,
      "Sergeant": 3,
      "Chief Sergeant": 2,
      "Assistant Inspector": 3,
      "Deputy Inspector": 3,
      "Inspector": 2,
      "Chief Inspector": 3,
      "DeputyCommander": 3,
      "Commander": 3,
    };

    // Calculate years of work for each employee and filter those eligible for appraisal
    const eligibleEmployees: EmployeeDocument[] = employees.filter(
      (employee) => {
        if (!employee.employmentDate) return false;

        // Use previous promotion date for calculation if available
        const promotionDate =
          employee.rankChanges.length > 0
            ? employee.rankChanges[0].date
            : employee.employmentDate;

        if (!promotionDate) return false; // Ensure promotionDate is defined

        const yearsOfWork: number = Math.floor(
          (new Date().getTime() - promotionDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365.25)
        );
        const requiredYears: number = titleMap[employee.title];
        return yearsOfWork >= requiredYears;
      }
    );

    // Filter out employees with existing appraisals
    const existingAppraisalIds = (
      await Appraisal.find().select("employeeId").exec()
    ).map((a) => a.employeeId);
    const uniqueEligibleEmployees = eligibleEmployees.filter((employee) => {
      return !existingAppraisalIds.includes(employee.empId);
    });

    // Save eligible employees to the Appraisal schema
    const appraisals: AppraisalDocument[] = uniqueEligibleEmployees
      .map((employee) => {
        const promotionDate =
          employee.rankChanges.length > 0
            ? employee.rankChanges[0].date
            : employee.employmentDate;
        if (!promotionDate) return null; // Skip if promotionDate is undefined
        return new Appraisal({
          employeeId: employee.empId,
          fullName: `${employee.firstName} ${employee.lastName}`,
          currentLevel: employee.title,
          desiredLevel: getNextTitle(employee.title),
          yearsOfWork: Math.floor(
            (new Date().getTime() - promotionDate!.getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          ),
          positionOfWork: employee.position,
          previousPromotionDate:
            employee.rankChanges.length > 0
              ? employee.rankChanges[0].date
              : undefined,
        });
      })
      .filter((appraisal) => appraisal !== null) as AppraisalDocument[]; // Filter out null values

    await Appraisal.insertMany(appraisals);

    console.log("Appraisals created successfully");
  } catch (error) {
    console.error("Error creating appraisals:", error);
  }
};

// Function to get the next title based on the current title
const getNextTitle = (currentTitle: string): string => {
  const titles: string[] = [
    "Constable",
    "Assistant Sergeant",
    "Deputy Sergeant",
    "Sergeant",
    "Chief Sergeant",
    "Assistant Inspector",
    "Deputy Inspector",
    "Inspector",
    "Chief Inspector",
    "DeputyCommander",
    "Commander",
  ];
  const currentIndex: number = titles.indexOf(currentTitle);
  return titles[currentIndex + 1] || "No Next Title";
};

// Controller function to get all appraisals
export const getAllAppraisals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appraisals: AppraisalDocument[] = await Appraisal.find().exec();

    res.status(200).json(appraisals);
  } catch (error) {
    console.error("Error fetching appraisals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
