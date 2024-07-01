import { Request, Response, NextFunction } from "express";
import LeaveInfoModel, { LeaveInfo } from "../models/leaveModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import NotificationService from "../services/notificationService";
import { getManagerIds } from "../services/employeeManagerService";
import cron from "node-cron";
//import { sendMail } from "../mail/sendEmail";

const updateCache: any = {};

const createLeaveInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, days, leaveType } = req.body;

    console.log(req.body);

    // Validate if the number of requested days is less than 30
    if (days > 30) {
      res.status(400).json({
        message: "The number of days requested should not exceed 30 days",
      });
      console.log("The number of days requested should not exceed 30 days");
      return;
    }

    const employee: any = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).json({ message: "Employee not found with this ID" });
      console.log("No employee found with this ID", employeeId);
      return;
    }

    // Check for overlapping leave requests
    const overlappingLeaves = await LeaveInfoModel.find({
      employeeId,
      status: { $in: ["pending", "approved"] },
    });

    if (overlappingLeaves.length > 0) {
      res.status(400).json({
        message: "You have an overlapping or unfinished leave request",
      });
      console.log("Overlapping or unfinished leave request found");
      return;
    }

    // Find the latest leave balance
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];
    if (!latestLeaveBalance) {
      res
        .status(404)
        .json({ message: "Leave balances not found for the employee" });
      console.log("Leave balances not found for the employee");
      return;
    }

    // Find the specific leave type balance within the latest year
    const leaveTypeBalance = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveType
    );
    if (!leaveTypeBalance) {
      res.status(404).json({
        message: `Leave type ${leaveType} not found for the employee`,
      });
      console.log(`Leave type ${leaveType} not found for the employee`);
      return;
    }

    // Check if requested days exceed available days
    if (days > leaveTypeBalance.available) {
      res.status(400).json({ message: "Insufficient leave balance" });
      console.log("Insufficient leave balance");
      return;
    }

    // Create and save the new leave info
    const newLeaveInfo = new LeaveInfoModel(req.body);
    await newLeaveInfo.save();
    console.log("New leave info:", newLeaveInfo);

    res
      .status(201)
      .json({ message: "Leave info saved successfully", newLeaveInfo });

    // Uncomment and modify the following if you want to send an email notification
    // if (newLeaveInfo) {
    //   const employeeEmail = await Employee.findOne({ empId: newLeaveInfo.employeeId }, "email");
    //   if (employeeEmail) {
    //     sendMail("Your leave request is pending!", employeeEmail.email);
    //   }
    // }

    // Send notifications
    await NotificationService.createNotification(
      employee._id.toString(),
      "Leave Request Submitted",
      "Your leave request has been submitted and is pending approval."
    );

    if (employee.manager) {
      const managerId = employee.manager;
      const manager = await getManagerIds(managerId);
      if (manager) {
        await NotificationService.createNotification(
          manager._id.toString(),
          "Leave Request from Employee",
          `Employee ${employee.firstName} ${employee.lastName} has submitted a leave request.`
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getLeaveInfoByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const employeeLeaveInfos = await LeaveInfoModel.find({
      employeeId: employeeId,
    });

    if (!employeeLeaveInfos || employeeLeaveInfos.length === 0) {
      res.status(404).json({ message: "Leave info not found" });
      return;
    }

    res.status(200).json({ employeeLeaveInfos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLeaveInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const leaveInfo: LeaveInfo[] = await LeaveInfoModel.find();
    // Fetch employee details for each leaveInfo in parallel
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: EmployeeDocument | null = await Employee.findOne({
            empId: info.employeeId,
          });
          if (employee) {
            // Include relevant employee details in the leaveInfo object
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + " " + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Log an error if an employee with the specified ID is not found
            console.error(
              `Employee not found for leaveInfo with ID ${info._id}`
            );
            return info.toObject();
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`
          );
          return info.toObject();
        }
      })
    );
    res.status(200).json(leaveInfoWithEmployeeDetails);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};
const getLeaveInfoForDepartmentHead = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    // Fetch leave information for employees in the same department as the department head
    const leaveInfo: LeaveInfo[] = await LeaveInfoModel.find();

    // Filter leaveInfo to include only those of employees in the same department
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: EmployeeDocument | null = await Employee.findOne({
            empId: info.employeeId,
            department: department,
          });

          if (employee) {
            // Include relevant employee details in the leaveInfo object
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + " " + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Employee not in the same department, exclude from results
            return null;
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`
          );
          return null;
        }
      })
    );

    // Filter out null values from the result
    const filteredLeaveInfo = leaveInfoWithEmployeeDetails.filter(
      (info) => info !== null
    );

    res.status(200).json(filteredLeaveInfo);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};

const getAllLeaveBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await Employee.find(
      {},
      "firstName empId leaveBalances lastUpdated"
    );

    if (!employees || employees.length === 0) {
      res.status(404).json({ message: "No employees found" });
      return;
    }

    res.status(200).json({
      message: "Leave balances fetched successfully",
      leaveBalancesData: employees,
    });
  } catch (error) {
    console.error("Error fetching leave balances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLeaveBalanceByYear = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { employeeId, year } = req.params;

    // Validate year parameter
    if (isNaN(Number(year))) {
      res.status(400).json({ message: "Invalid year format" });
      return;
    }

    // Find the employee by employeeId
    const employee: any = await Employee.findOne({ empId: employeeId });

    if (!employee) {
      res.status(404).json({ message: "Employee not found with this ID" });
      return;
    }

    // Find the leave balance for the specified year
    const leaveBalanceForYear = employee.leaveBalances.find(
      (balance: any) => balance.year === Number(year)
    );

    if (!leaveBalanceForYear) {
      res
        .status(404)
        .json({ message: `No leave balance found for year ${year}` });
      return;
    }

    res.status(200).json({
      message: `Leave balance for year ${year} fetched successfully`,
      leaveBalance: leaveBalanceForYear,
    });
  } catch (error) {
    console.error("Error fetching leave balance by year:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllLeaveBalancesByYearForAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { year } = req.params;

    // Validate year parameter
    if (isNaN(Number(year))) {
      res.status(400).json({ message: "Invalid year format" });
      return;
    }

    // Find all employees
    const employees = await Employee.find({}, "firstName empId leaveBalances");

    if (!employees || employees.length === 0) {
      res.status(404).json({ message: "No employees found" });
      return;
    }

    // Filter leave balances by the specified year for each employee
    const leaveBalancesForYear = employees
      .map((employee) => {
        const leaveBalanceForYear = employee.leaveBalances.find(
          (balance: any) => balance.year === Number(year)
        );

        return leaveBalanceForYear
          ? {
              empId: employee.empId,
              firstName: employee.firstName,
              leaveBalance: leaveBalanceForYear,
            }
          : null;
      })
      .filter((result) => result !== null); // Remove entries where leaveBalanceForYear was not found

    if (leaveBalancesForYear.length === 0) {
      res
        .status(404)
        .json({ message: `No leave balances found for year ${year}` });
      return;
    }

    res.status(200).json({
      message: `Leave balances for year ${year} fetched successfully`,
      leaveBalances: leaveBalancesForYear,
    });
  } catch (error) {
    console.error(
      "Error fetching leave balances by year for all employees:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLeaveInfoForManager = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    // Fetch leave information for employees managed by the manager
    const leaveInfo: LeaveInfo[] = await LeaveInfoModel.find();

    // Filter leaveInfo to include only those of employees managed by the manager
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: EmployeeDocument | null = await Employee.findOne({
            empId: info.employeeId,
            manager: managerId,
          });

          if (employee) {
            // Include relevant employee details in the leaveInfo object
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + " " + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Employee not managed by the specified manager, exclude from results
            return null;
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`
          );
          return null;
        }
      })
    );

    // Filter out null values from the result
    const filteredLeaveInfo = leaveInfoWithEmployeeDetails.filter(
      (info) => info !== null
    );

    res.status(200).json(filteredLeaveInfo);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};

const updateLeaveInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      leaveId,
      status,
      delegatedTo = "",
      reason = "",
      from,
      to,
    } = req.body;

    console.log("Leave ID:", leaveId);
    console.log("Data from req body:", req.body);

    const leaveInfo: any = await LeaveInfoModel.findOne({ leaveId: leaveId });

    if (!leaveInfo) {
      res.status(404).json({ message: "Leave info not found" });
      return;
    }

    // Validate the dates
    const fromDate: any = new Date(from);
    const toDate: any = new Date(to);
    const currentDate: any = new Date();

    if (isNaN(toDate.getTime()) || isNaN(fromDate.getTime())) {
      res.status(400).json({ error: "Invalid date format" });
      console.log("Invalid date");
      return;
    }

    if (toDate < currentDate || fromDate < currentDate) {
      res
        .status(400)
        .json({ message: "The 'to' and 'from' dates must be in the future" });
      console.log("Date should be in the future");
      return;
    }

    if (toDate < fromDate) {
      res
        .status(400)
        .json({ message: "'To' date cannot be earlier than 'from' date" });
      console.log("'To' date cannot be earlier than 'from' date");
      return;
    }

    if (status === "rejected") {
      console.log("Rejecting leave request");
      const up = await LeaveInfoModel.findOneAndUpdate(
        { leaveId: leaveId },
        {
          rejectReason: reason,
          status: "rejected",
        },
        { new: true }
      );
      console.log("Rejected successfully");

      const employee = await Employee.findOne({ empId: leaveInfo.employeeId });
      if (employee) {
        await NotificationService.createNotification(
          employee._id.toString(),
          "Leave Request Rejected",
          "Your leave request has been rejected."
        );
      }
      res.status(200).json({ message: "Rejected successfully" });
      return;
    }

    if (delegatedTo) {
      const delegator = await Employee.findOne({ empId: delegatedTo });
      if (!delegator) {
        res
          .status(400)
          .json({ message: "Delegator not found with the given id " });
        console.log("Delegated To: not found ");
        return;
      }

      // Check for overlapping pending leave requests for the delegator
      const overlappingLeaves = await LeaveInfoModel.find({
        employeeId: delegatedTo,
        status: { $in: ["pending", "approved"] },
        $or: [
          { from: { $lte: toDate, $gte: fromDate } },
          { to: { $gte: fromDate, $lte: toDate } },
          { from: { $lte: fromDate }, to: { $gte: toDate } },
        ],
      });

      if (overlappingLeaves.length > 0) {
        res.status(400).json({
          message:
            "Delegator has pending leave requests in the given time interval",
        });
        return;
      }

      // Check if the delegatedTo employee is delegated or assigned to another employee on leave currently
      const isDelegatedToAnother = await LeaveInfoModel.find({
        delegatedTo: delegatedTo,
        status: { $in: ["pending", "approved"] },
        $or: [
          { from: { $lte: toDate, $gte: fromDate } },
          { to: { $gte: fromDate, $lte: toDate } },
          { from: { $lte: fromDate }, to: { $gte: toDate } },
        ],
      });

      if (isDelegatedToAnother.length > 0) {
        res.status(400).json({
          message:
            "The employee is delegated or assigned to another employee who is currently on leave",
        });
        return;
      }

      const updatedLeaveInfo: any = await LeaveInfoModel.findOne({
        leaveId: leaveId,
      });
      const requester: any = await Employee.findOne({
        empId: updatedLeaveInfo.employeeId,
      });

      if (!requester) {
        res
          .status(400)
          .json({ message: "Requester not found with the given id " });
        console.log("Requester: not found ");
        return;
      }

      // Check if the requester and the delegator are in the same department
      if (requester.department !== delegator.department) {
        res.status(400).json({
          message: "Requester and delegator are not in the same department",
        });
        return;
      }

      await LeaveInfoModel.findOneAndUpdate(
        { leaveId: leaveId },
        { delegatedTo },
        { new: true }
      );
    } else {
      res
        .status(404)
        .send({ message: "Couldn't find delegator with the given id" });
      return;
    }

    console.log("Body is", req.body);

    // Update the leave status and dates
    const updatedLeaveInfo: any = await LeaveInfoModel.findOneAndUpdate(
      { leaveId: leaveId },
      { status, from: fromDate, to: toDate },
      { new: true }
    );

    if (!updatedLeaveInfo) {
      res.status(404).json({ message: "Leave info not found" });
      return;
    }

    // Continue only if the leave request is approved
    const days: number = updatedLeaveInfo.days;
    const leaveType = updatedLeaveInfo.leaveType;

    // Find the employee by the employeeId from the leaveInfo
    const employee: any = await Employee.findOne({
      empId: updatedLeaveInfo.employeeId,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Find the latest year's leave balance
    const latestLeaveBalance =      employee.leaveBalances[employee.leaveBalances.length - 1];

    if (!latestLeaveBalance) {
      res
        .status(404)
        .json({ message: "Leave balances not found for the employee" });
      return;
    }

    // Find the specific leave type balance within the latest year
    const leaveTypeBalance = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveType
    );

    if (!leaveTypeBalance) {
      res
        .status(404)
        .json({
          message: `Leave type ${leaveType} not found for the employee`,
        });
      return;
    }

    // Update the leave balances
    console.log("days: " + days);
    console.log("wait for the hr approval to proceed leave balance update")
    
    leaveTypeBalance.used += days;
    leaveTypeBalance.available -= days;

    // Save the updated employee leave balances
    await employee.save();

    // Log the updated employee leave balances
    console.log(
      "Employee leave balances updated successfully:",
      employee.leaveBalances
    );

    await NotificationService.createNotification(
      employee._id.toString(),
      "Leave Request Approved",
      "Your leave request has been approved. Enjoy your leave!"
    );

    res.status(200).json({
      message: "Leave info updated and leave balances adjusted successfully",
      leaveInfo: updatedLeaveInfo,
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateLeaveBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { empId } = req.params;
    const { leaveType, updatedValues } = req.body;
    console.log("data is ", req.body);
    // Find the employee by empId
    const employee: any = await Employee.findOne({ empId:empId });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Get the latest leave balance year
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];

    // Find the specific leave type within the latest leave balance year
    const leaveBalanceToUpdate = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveType
    );

    if (!leaveBalanceToUpdate) {
      res.status(404).json({ message: "Leave type not found" });
      return;
    }

    // Update the leave balance values
    const currentCredit = leaveBalanceToUpdate.credit;
    const currentUsed = leaveBalanceToUpdate.used;

    const newCredit = updatedValues.credit !== undefined ? updatedValues.credit : currentCredit;
    const newUsed =updatedValues.used !== undefined ? updatedValues.used : currentUsed;

    leaveBalanceToUpdate.credit = newCredit;
    leaveBalanceToUpdate.used = newUsed;
    leaveBalanceToUpdate.available = newCredit - newUsed;
    console.log("leave balance to update  ", leaveBalanceToUpdate)

    await employee.save();

    res.status(200).json({
      message: "Leave balances updated successfully",
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error("Error updating leave balances:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//!to be deleted
const transferAvailableCredits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();

    // Fetch all employees
    const employees = await Employee.find(
      {},
      "firstName empId leaveBalances lastUpdated"
    );

    if (!employees || employees.length === 0) {
      console.log("No employees found");
      res.status(404).json({ message: "No employees found" });
      return;
    }

    // Process each employee's leave balances
    const processedLeaveBalancesData = employees.map(async (employee) => {
      // Check if the leave balances were already updated this year
      if (
        employee.lastUpdated &&
        new Date(employee.lastUpdated).getFullYear() === currentYear
      ) {
        return {
          firstName: employee.firstName,
          empId: employee.empId,
          leaveBalances: employee.leaveBalances,
        };
      }

      // Traverse the leave balances from the oldest to the latest year
      for (let i = 0; i < employee.leaveBalances.length - 1; i++) {
        const currentYearBalance = employee.leaveBalances[i];
        const nextYearBalance = employee.leaveBalances[i + 1];

        // Add current year's available leaves to the next year's credit for "annual" leave type
        currentYearBalance.balances.forEach((balance) => {
          if (balance.leaveType === "annual") {
            const nextYearLeave = nextYearBalance.balances.find(
              (nextBalance) => nextBalance.leaveType === balance.leaveType
            );

            if (nextYearLeave) {
              nextYearLeave.credit += balance.available;
            } else {
              nextYearBalance.balances.push({
                leaveType: balance.leaveType,
                credit: balance.available,
                used: 0,
                available: balance.available, // initially set available to the transferred available
              });
            }
          }
        });

        // Recalculate the available balance for the next year
        nextYearBalance.balances.forEach((nextBalance) => {
          if (nextBalance.leaveType === "annual") {
            nextBalance.available = nextBalance.credit - nextBalance.used;
          }
        });
      }

      // Update lastUpdated field
      employee.lastUpdated = new Date();
      await employee.save();

      return {
        firstName: employee.firstName,
        empId: employee.empId,
        leaveBalances: employee.leaveBalances,
      };
    });

    // Wait for all promises to resolve
    const leaveBalanceData = await Promise.all(processedLeaveBalancesData);

    console.log("Leave balances processed and updated successfully");

    res.status(200).json({
      message: "Available credits transferred successfully",
      leaveBalanceData,
    });
  } catch (error) {
    console.error("Error updating leave balances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteLeaveInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // const deletedLeaveInfo = await LeaveInfoModel.findByIdAndDelete(
    //   req.params.id
    // );
    // if (!deletedLeaveInfo) {
    //   res.status(404).json({ error: "Leave info not found" });
    //   return;
    // }
    // // Update the Employee model to remove the leaveInfo reference
    // const employee = await Employee.findById(deletedLeaveInfo.employeeId);
    // if (employee) {
    //   employee.leaveInfo = undefined;
    //   await employee.save();
    // }
    // res.status(200).json({
    //   message: "Leave info deleted successfully",
    //   deletedLeaveInfo,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const hrLeaveApproval = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leaveId, confirm } = req.body;

    console.log("Leave ID:", leaveId);
    console.log("Confirm:", confirm);

    const leaveInfo: any = await LeaveInfoModel.findOne({ leaveId });

    if (!leaveInfo) {
      res.status(404).json({ message: "Leave info not found" });
      return;
    }

    if (leaveInfo.hrApproval) {
      res.status(400).json({ message: "Leave request already approved by HR" });
      return;
    }

    if (!confirm) {
      res.status(400).json({ message: "HR approval confirmation required" });
      return;
    }

    leaveInfo.hrApproval = true;

    // Find the employee by the employeeId from the leaveInfo
    const employee: any = await Employee.findOne({
      empId: leaveInfo.employeeId,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Find the latest year's leave balance
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];

    if (!latestLeaveBalance) {
      res
        .status(404)
        .json({ message: "Leave balances not found for the employee" });
      return;
    }

    // Find the specific leave type balance within the latest year
    const leaveTypeBalance = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveInfo.leaveType
    );

    if (!leaveTypeBalance) {
      res
        .status(404)
        .json({
          message: `Leave type ${leaveInfo.leaveType} not found for the employee`,
        });
      return;
    }

    // Update the leave balances
    leaveTypeBalance.used += leaveInfo.days;
    leaveTypeBalance.available -= leaveInfo.days;

    // Save the updated leave info and employee leave balances
    await leaveInfo.save();
    await employee.save();

    await NotificationService.createNotification(
      employee._id.toString(),
      "Leave Request Approved by HR",
      "Your leave request has been approved by HR. Enjoy your leave!"
    );

    res.status(200).json({
      message:
        "Leave request approved by HR and leave balances updated successfully",
      leaveInfo,
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export {
  createLeaveInfo,
  updateLeaveInfo,
  deleteLeaveInfo,
  getAllLeaveInfo,
  getLeaveInfoForDepartmentHead,
  getLeaveInfoForManager,
  updateLeaveBalances,
  getAllLeaveBalances,
  getAllLeaveBalanceByYear,
  getAllLeaveBalancesByYearForAllEmployees,
  getLeaveInfoByEmployeeId,
  transferAvailableCredits,
  hrLeaveApproval
};
