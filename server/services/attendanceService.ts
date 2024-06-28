
import Attendance from "../models/attendanceModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import Leave from "../models/leaveModel"; // Assuming you have a leave model
import NotificationService from './notificationService';
import { getManagerIds } from './employeeManagerService';

const getStartAndEndOfDay = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

const checkIfOnLeave = async (
  employeeId: string,
  date: Date
): Promise<boolean> => {
  const leave = await Leave.findOne({
    employeeId,
    from: { $lte: date },
    to: { $gte: date },
    status: "approved", // Add status check for "approved"
  });
  return !!leave;
};

export const declareAbsentees = async () => {
  const currentDate = new Date();
  const thresholdTime = new Date();
  thresholdTime.setHours(16, 20, 0); // Assuming 9:00 AM is the threshold for being considered late

  const employees: EmployeeDocument[] = await Employee.find();
  const absentees: string[] = [];

  for (const employee of employees) {
    if (!employee.empId) continue; // Skip employees without empId
    const isOnLeave = await checkIfOnLeave(employee.empId, currentDate);

    if (!isOnLeave) {
      const attendance = await Attendance.findOne({
        employeeId: employee.empId,
        date: {
          $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
          $lt: new Date(currentDate.setHours(23, 59, 59, 999)),
        },
      });


      if (!attendance) {
        const absenteeRecord = new Attendance({
          employeeId: employee.empId,
          status: "absent",
          // recordedTime: new Date(),
          date: new Date(),
        });
        await absenteeRecord.save();
        await Employee.updateOne(
          { empId: employee.empId },
          {
            $push: {
              attendanceRecords: { date: new Date(), status: "absent" },
            },
          }
        );
        absentees.push(employee.empId);
      // Check for consecutive absences
        const recentAttendances = await Attendance.find({
          employeeId: employee.empId,
          status: "absent",
          date: { $gte: new Date(new Date().setDate(new Date().getDate() - 2)) },
        });

        if (recentAttendances.length >= 2) {
          // Notify employee and their manager about the absence
          const employeeName = `${employee.firstName} ${employee.lastName}`;
          await NotificationService.createNotification(
            employee._id.toString(),
            "Attendance: Consecutive Absences",
            "You have been absent for two or more consecutive days. Please provide evidence."
          );
          if (employee.manager) {
            const managerId = employee.manager;
            const manager = await getManagerIds(managerId);
            await NotificationService.createNotification(
              manager._id.toString(),
              "Attendance: Employee Consecutive Absences",
              `Employee ${employeeName} has been absent for two or more consecutive days.`
            );
          }
        }
      } else if (attendance.recordedTime > thresholdTime) {
        attendance.status = "late";
        await attendance.save();
      }
    }
  }

  return absentees;
};

export const handleFileUpload = async (
  file: Express.Multer.File,
  permissionStatus: string,
  employeeId: string
) => {
  try {
    // Find the attendance record by ID and update it
    const { startOfDay, endOfDay } = getStartAndEndOfDay();
    const attendanceRecord = await Attendance.findOne({
      employeeId:employeeId,
      date: { $gte: startOfDay, $lt: endOfDay },
      status: "absent",
    });

    if (!attendanceRecord) {
      throw new Error("Attendance record not found");
    }

    attendanceRecord.evidence = file.path;
    attendanceRecord.reviewStatus = "pending";
    await attendanceRecord.save();
    return {
      message: "File uploaded and attendance record updated successfully",
      permissionStatus,
      employeeId,
      fileName: file.filename,
      filePath: file.path,
    };
  } catch (error) {
    throw new Error(`Error updating attendance record: ${(error as Error).message}`);
  }
};