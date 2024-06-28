import { Request, Response } from "express";
import Attendance from "../models/attendanceModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import Leave from "../models/leaveModel"; // Assuming you have a leave model
import { handleFileUpload } from "../services/attendanceService";
import NotificationService from '../services/notificationService';
import { getManagerIds } from '../services/employeeManagerService';

const getStartAndEndOfDay = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await Attendance.find();

    // Fetch related Employee data for each attendance
    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        const employee = await Employee.findOne({
          empId: attendance.employeeId,
        });
        if (!employee) {
          throw new Error(
            `Employee not found for ID: ${attendance.employeeId}`
          );
        }
        let totalHoursWorked: string;
        if (attendance.status === 'absent') {
          totalHoursWorked = '0 hours, 0 minutes';
        } else {
          const checkIn = new Date(attendance.recordedTime);
          const checkOut = new Date(attendance.checkOutTime || new Date());
          const millisecondsWorked = checkOut.getTime() - checkIn.getTime();
          const hoursWorked = Math.floor(millisecondsWorked / (1000 * 60 * 60));
          const minutesWorked = Math.floor(
            (millisecondsWorked % (1000 * 60 * 60)) / (1000 * 60)
          );
          totalHoursWorked = `${hoursWorked} hours, ${minutesWorked} minutes`;
        }

        return {
          ...attendance.toObject(),
          totalHoursWorked,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          department: employee.department,
        };
      })
    );

    res.status(200).json(attendancesWithEmployeeData);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching attendances:", error.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error fetching attendances:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const getAttendancesForDepartmentHead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { departmentHeadId } = req.params;

    // Fetch the department head details
    const departmentHead: EmployeeDocument | null = await Employee.findOne({
      empId: departmentHeadId,
      role: "department head",
    });

    if (!departmentHead) {
      res.status(404).json({ message: "Department head not found" });
      return;
    }

    const department = departmentHead.department;

    // Fetch attendances for employees in the same department
    const attendances = await Attendance.find();

    // Filter and fetch related Employee data for each attendance
    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        if (attendance.employeeId === departmentHeadId) {
          return null; // Exclude department head's own attendance
        }

        const employee = await Employee.findOne({
          empId: attendance.employeeId,
          department: department,
        });
        if (!employee) {
          return null; // Employee not in the same department, exclude from results
        }
        let totalHoursWorked: string;
        if (attendance.status === "absent") {
          totalHoursWorked = "0 hours, 0 minutes";
        } else {
          const checkIn = new Date(attendance.recordedTime);
          const checkOut = new Date(attendance.checkOutTime || new Date());
          const millisecondsWorked = checkOut.getTime() - checkIn.getTime();
          const hoursWorked = Math.floor(millisecondsWorked / (1000 * 60 * 60));
          const minutesWorked = Math.floor(
            (millisecondsWorked % (1000 * 60 * 60)) / (1000 * 60)
          );
          totalHoursWorked = `${hoursWorked} hours, ${minutesWorked} minutes`;
        }

        return {
          ...attendance.toObject(),
          totalHoursWorked,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          department: employee.department,
        };
      })
    );

    // Filter out null values from the result
    const filteredAttendances = attendancesWithEmployeeData.filter(
      (attendance) => attendance !== null
    );

    res.status(200).json(filteredAttendances);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching attendances:", error.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error fetching attendances:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const getAttendancesForManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { managerId } = req.params;

    // Fetch the manager details
    const manager: EmployeeDocument | null = await Employee.findOne({
      empId: managerId,
      role: "manager",
    });

    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }

    // Fetch attendances for employees managed by the manager, excluding the manager
    const attendances = await Attendance.find();

    // Filter and fetch related Employee data for each attendance
    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        if (attendance.employeeId === managerId) {
          return null; // Exclude manager's own attendance
        }

        const employee = await Employee.findOne({
          empId: attendance.employeeId,
          manager: managerId,
        });

        if (!employee) {
          return null; // Employee not managed by the specified manager, exclude from results
        }

        let totalHoursWorked: string;
        if (attendance.status === "absent") {
          totalHoursWorked = "0 hours, 0 minutes";
        } else {
          const checkIn = new Date(attendance.recordedTime);
          const checkOut = new Date(attendance.checkOutTime || new Date());
          const millisecondsWorked = checkOut.getTime() - checkIn.getTime();
          const hoursWorked = Math.floor(millisecondsWorked / (1000 * 60 * 60));
          const minutesWorked = Math.floor(
            (millisecondsWorked % (1000 * 60 * 60)) / (1000 * 60)
          );
          totalHoursWorked = `${hoursWorked} hours, ${minutesWorked} minutes`;
        }

        return {
          ...attendance.toObject(),
          totalHoursWorked,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          department: employee.department,
        };
      })
    );

    // Filter out null values from the result
    const filteredAttendances = attendancesWithEmployeeData.filter(
      (attendance) => attendance !== null
    );

    res.status(200).json(filteredAttendances);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching attendances:", error.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error fetching attendances:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};



export const getPendingReviewAttendances = async (
  req: Request,
  res: Response
) => {
  try {
    const attendances = await Attendance.find({ reviewStatus: "pending" });

    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        const employee = await Employee.findOne({
          empId: attendance.employeeId,
        });
        if (!employee) {
          throw new Error(
            `Employee not found for ID: ${attendance.employeeId}`
          );
        }

        return {
          ...attendance.toObject(),
          employeeId:employee.empId,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          department: employee.department,
        };
      })
    );

    res.status(200).json(attendancesWithEmployeeData);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error fetching pending review attendances:",
        error.message
      );
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error fetching pending review attendances:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const getPendingReviewAttendancesForDepartmentHead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { departmentHeadId } = req.params;

    // Fetch the department head details
    const departmentHead: EmployeeDocument | null = await Employee.findOne({
      empId: departmentHeadId,
      role: "department head",
    });

    if (!departmentHead) {
      res.status(404).json({ message: "Department head not found" });
      return;
    }

    const department = departmentHead.department;

    // Fetch pending review attendances for employees in the same department as the department head
    const attendances = await Attendance.find({
      reviewStatus: "pending",
    });

    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        if (attendance.employeeId === departmentHeadId) {
          return null; // Exclude department head's own attendance
        }
        const employee = await Employee.findOne({
          empId: attendance.employeeId,
          department: department,
        });

        if (employee && employee.empId !== departmentHead.empId) {
          return {
            ...attendance.toObject(),
            employeeId: employee.empId,
            name: `${employee.firstName} ${employee.lastName}`,
            position: employee.position,
            department: employee.department,
          };
        } else {
          return null;
        }
      })
    );

    // Filter out null values (attendances with no corresponding employee)
    const filteredAttendances = attendancesWithEmployeeData.filter(
      (attendance) => attendance !== null
    );

    res.status(200).json(filteredAttendances);
  } catch (error) {
    console.error(
      "Error fetching pending review attendances for department head:",
      error
    );
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getPendingReviewAttendancesForManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { managerId } = req.params;

    // Fetch the manager details
    const manager: EmployeeDocument | null = await Employee.findOne({
      empId: managerId,
      role: "manager",
    });

    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }

    // Fetch pending review attendances for employees managed by the manager
    const attendances = await Attendance.find({
      reviewStatus: "pending",
    });

    const attendancesWithEmployeeData = await Promise.all(
      attendances.map(async (attendance) => {
        if (attendance.employeeId === managerId) {
          return null; // Exclude department head's own attendance
        }
        const employee = await Employee.findOne({
          empId: attendance.employeeId,
          manager: managerId,
        });

        if (employee) {
          return {
            ...attendance.toObject(),
            employeeId: employee.empId,
            name: `${employee.firstName} ${employee.lastName}`,
            position: employee.position,
            department: employee.department,
          };
        } else {
          return null;
        }
      })
    );

    // Filter out null values (attendances with no corresponding employee)
    const filteredAttendances = attendancesWithEmployeeData.filter(
      (attendance) => attendance !== null
    );

    res.status(200).json(filteredAttendances);
  } catch (error) {
    console.error(
      "Error fetching pending review attendances for manager:",
      error
    );
    res.status(500).send({ message: "Internal server error" });
  }
};

export const recentAttendances = async (req: Request, res: Response) => {
  try {
    const recentActivities = await Attendance.aggregate([
      { $sort: { recordedTime: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "empId",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          empId: 1,
          action: 1,
          recordedTime: 1,
          checkOutTime: 1,
          "employeeDetails.firstName": 1,
          "employeeDetails.lastName": 1,
          "employeeDetails.photo": 1,
        },
      },
    ]);

    const formattedActivities = recentActivities.map((activity) => ({
      empId: activity.empId,
      action:
        activity.checkOutTime &&
        new Date(activity.checkOutTime) > new Date(activity.recordedTime)
          ? "checkedOut"
          : "checkedIn",
      recordedTime: activity.recordedTime,
      checkOutTime: activity.checkOutTime,
      employeeDetails: {
        firstName: activity.employeeDetails.firstName,
        lastName: activity.employeeDetails.lastName,
        photo: activity.employeeDetails.photo,
      },
    }));

    res.json(formattedActivities);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching recent attendances:", err.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error fetching recent attendances:", err);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const recordAttendance = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .send({ message: "Attendance already recorded for today" });
    }

    const recordedTime = new Date();
    const thresholdTime = new Date();
    thresholdTime.setHours(16, 20, 0); // Assuming 9:00 AM is the threshold for being considered late
    const status = recordedTime > thresholdTime ? "late" : "on time";

    const attendance = new Attendance({ employeeId, status, recordedTime });
    await attendance.save();

    await Employee.updateOne(
      { empId: employeeId },
      {
        $push: {
          attendanceRecords: { date: new Date(), status, recordedTime },
        },
      }
    );

    res.status(201).send({ message: "Attendance recorded successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error recording attendance:", error.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error recording attendance:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const recordCheckout = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: ["late", "on time","absent"] },
    });

    if (!existingAttendance) {
      return res
        .status(400)
        .send({ message: "No attendance record found for check-out" });
    }

    if (existingAttendance.checkOutTime) {
      return res.status(400).send({ message: "Check-out already recorded" });
    }

    existingAttendance.checkOutTime = new Date();
    await existingAttendance.save();

    const { status, recordedTime, checkOutTime } = existingAttendance;

    await Employee.updateOne(
      { empId: employeeId },
      {
        $set: {
          "attendanceRecords.$[elem].status": status,
          "attendanceRecords.$[elem].recordedTime": recordedTime,
          "attendanceRecords.$[elem].checkOutTime": checkOutTime,
        },
      },
      {
        arrayFilters: [{ "elem.date": { $gte: startOfDay, $lt: endOfDay } }],
      }
    );

    res.status(200).send({ message: "Check-out recorded successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error recording check-out:", error.message);
      res.status(500).send({ message: "Internal server error" });
    } else {
      console.error("Error recording check-out:", error);
      res.status(500).send({ message: "Unknown error occurred" });
    }
  }
};

export const submitEvidence = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;
    const file = req.file;
    const permissionStatus="pending"
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(file.filename);
    const result = await handleFileUpload(file, permissionStatus, employeeId);

    const employee = await Employee.findOne({ empId: employeeId });
    if (employee) {
      const employeeName = `${employee.firstName} ${employee.lastName}`;
      // Notify employee and their manager about the evidence submission
      await NotificationService.createNotification(
        employee._id.toString(),
        'Attendance: Evidence Submitted',
        'Your evidence has been submitted for review.'
      );

      if (employee.manager) {
        const managerId = employee.manager
        const manager = await getManagerIds(managerId);
        await NotificationService.createNotification(
          manager._id.toString(),
          'Evidence Submitted',
          `Employee ${employeeName} has submitted evidence for review.`
        );
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Error Submitting evidence:", (error as Error).message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const reviewEvidence = async (req: Request, res: Response) => {
  try {
    const { _id, reviewStatus } = req.body; // reviewStatus should be 'approved' or 'rejected'
    console.log("rec " + JSON.stringify(req.body));
    if (!["approved", "rejected"].includes(reviewStatus)) {
      return res.status(400).send({ message: "Invalid review status" });
    }

    const attendanceRecord = await Attendance.findById(_id);

    if (!attendanceRecord) {
      return res.status(404).send({ message: "Attendance record not found" });
    }

    attendanceRecord.reviewStatus = reviewStatus;

    if (reviewStatus === "approved") {
      attendanceRecord.status = "permission";
    }

    await attendanceRecord.save();

    // Update the corresponding employee's attendance record
    const employee = await Employee.findOne({
      empId: attendanceRecord.employeeId,
    });
    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    const normalizeDate = (date: Date) =>
      new Date(date.setHours(0, 0, 0, 0)).getTime();

    const attendanceIndex = employee.attendanceRecords.findIndex((record) => {
      const recordDate = normalizeDate(new Date(record.date));
      const attendanceDate = normalizeDate(new Date(attendanceRecord.date));
      console.log(`Comparing ${recordDate} with ${attendanceDate}`);
      return recordDate === attendanceDate;
    });
    console.log(attendanceIndex);
    if (attendanceIndex !== -1) {
      if (reviewStatus === "approved") {
        employee.attendanceRecords[attendanceIndex].status = "permission";
      }
      employee.attendanceRecords[attendanceIndex].reviewStatus = reviewStatus;
      await employee.save();
    } else {
      return res
        .status(404)
        .send({ message: "Attendance record not found in employee's records" });
    }

    const notificationTitle = reviewStatus === "approved" ? 'Attendance: Evidence Approved' : 'Attendance: Evidence Rejected';
    const notificationMessage = reviewStatus === "approved" ? 
      'Your submitted evidence has been approved.' : 
      'Your submitted evidence has been rejected.';

      // const employee = await Employee.findOne({
      //   empId: attendanceRecord.employeeId,
      // });
    await NotificationService.createNotification(
      employee._id.toString(),
      notificationTitle,
      notificationMessage
    );

    res.status(200).send({ message: "Evidence reviewed successfully" });
  } catch (error) {
    console.error("Error reviewing evidence:", (error as Error).message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getMonthAttendanceData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract the month from the query string and assert it as a string
    const month = req.query.month as string; // e.g., "January"

    const year = new Date().getFullYear();

    // Get the index of the month (0 for January, 1 for February, etc.)
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

    // Create date range for the specified month
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    // Fetch attendance records for the specified month
    const attendanceRecords = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("employeeId");

    // Transform the data
    const data = await Promise.all(
      attendanceRecords.map(async (record) => {
        const employee = await Employee.findOne({empId:record.employeeId});
        return {
          name: employee?.firstName + ' ' + employee?.lastName || "",
          avatar: employee?.photo || "",
          attendance: record.status,
          date: record.date,
        };
      })
    );

    // Send response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};