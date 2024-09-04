import { Request, Response, NextFunction } from "express";
import Employee from "../models/employeeModel";
import LeaveBalanceModel, { LeaveBalance } from "../models/leaveBalanceModel";
import SecurityModel from "../models/securityModel";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NotificationService from '../services/notificationService';
import Securities from "../models/securityModel";
import dayjs from "dayjs";
import HRStaff from "../models/hrstaffModel";

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 2 * 60 * 1000;

// const createEmployee = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newEmployeeData = req.body;

//     // Calculate leave balances
//     const employmentDate = new Date(newEmployeeData.employmentDate);
//     const currentYear = new Date().getFullYear();
//     const leaveTypes = await LeaveBalanceModel.find(
//       {},
//       { leaveType: 1, credit: 1, _id: 0 }
//     ); // Fetch all leave types with credit

//     // console.log("leave from leavebalance mode ", leaveTypes);
//     const leaveBalances: {
//       year: number;
//       balances: {
//         leaveType: string;
//         credit: number;
//         used: number;
//         available: number;
//       }[];
//     }[] = [];

//     for (let year = employmentDate.getFullYear(); year <= currentYear; year++) {
//       console.log("year: " + year);
//       const balances = leaveTypes.map((type) => ({
//         leaveType: type.leaveType,
//         credit: type.credit,
//         used: 0,
//         available: type.credit,
//       }));

//       leaveBalances.push({ year, balances });
//     }

//     const newEmployee = new Employee({
//       ...newEmployeeData,
//       leaveBalances,
//     });

//     //!check the security
//     if (newEmployeeData.department === "security") {
//       const securityInfo = {
//         department: newEmployeeData.department,
//         email: newEmployeeData.email,
//         name: newEmployeeData.firstName,
//       };
//       const newLeaveInfo = new SecurityModel(securityInfo);
//       newLeaveInfo && (await newLeaveInfo.save());
//     }

//     await newEmployee.save();

//     res
//       .status(201)
//       .json({ message: "Employee saved successfully", newEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const generateOTP = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
  const length = 12;
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  } // Generates an 12-character OTP
  return otp;
};

// const sendOTPEmail = async (email: string, otp: string) => {
//   if (!email) {
//     throw new Error("No recipient email address provided");
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your One-Time Password (OTP)",
//     text: `Your OTP for initial login is: ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// };
const sendOTPEmail = async( email: string, otp: string) => {
  if (!email) {
    throw new Error("No recipient email address provided");
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable
      pass: process.env.EMAIL_PASS, // Use environment variable
    },
  });

  try {
    await transporter.sendMail({
      to: email,
      subject: "Your One-Time Password (OTP)",
      html: `<h1 style="color: green; font-weight: bold;">Your OTP is: ${otp}</h1>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
// const createEmployee = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newEmployeeData = req.body;

//     // Generate OTP
//     const otp = generateOTP();

//     // hash the otp
//     const hashedOTP = await bcrypt.hash(otp, 10);

//     // Calculate leave balances
//     const employmentDate = new Date(newEmployeeData.employmentDate);
//     const currentYear = new Date().getFullYear();
//     const leaveTypes = await LeaveBalanceModel.find(
//       {},
//       { leaveType: 1, credit: 1, _id: 0 }
//     ); // Fetch all leave types with credit

//     const leaveBalances: {
//       year: number;
//       balances: {
//         leaveType: string;
//         credit: number;
//         used: number;
//         available: number;
//       }[];
//     }[] = [];

//     for (let year = employmentDate.getFullYear(); year <= currentYear; year++) {
//       const balances = leaveTypes.map((type) => ({
//         leaveType: type.leaveType,
//         credit: type.credit,
//         used: 0,
//         available: type.credit,
//       }));

//       leaveBalances.push({ year, balances });
//     }

//     const newEmployee = new Employee({
//       ...newEmployeeData,
//       password: hashedOTP, // Save OTP as the initial password
//       leaveBalances,
//     });

//     //!check the security
//     if (newEmployeeData.department === "security") {
//       const securityInfo = {
//         department: newEmployeeData.department,
//         email: newEmployeeData.email,
//         name: newEmployeeData.firstName,
//       };
//       const newLeaveInfo = new SecurityModel(securityInfo);
//       newLeaveInfo && (await newLeaveInfo.save());
//     }

//     await newEmployee.save();

//     // Send OTP to user's email
//     await sendOTPEmail(newEmployee.email, otp);

//     res
//       .status(201)
//       .json({ message: "Employee saved successfully, OTP sent", newEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const createEmployee = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newEmployeeData = req.body;
// console.log("newEmployeeData",newEmployeeData)
//         // Generate OTP
//         // let birthday: Date | null = null;
//         // if (newEmployeeData.birthday) {
//         //   birthday = new Date(newEmployeeData.birthday);
//         //   if (isNaN(birthday.getTime())) {
//         //     console.error(
//         //       "Invalid date format for birthday:",
//         //       newEmployeeData.birthday
//         //     );
//         //     res
//         //       .status(400)
//         //       .json({ error: "Invalid date format for birthday" });
//         //   }
//         // }

//         // Parse employmentDate to ensure it's a valid date
//         // const employmentDate = new Date(newEmployeeData.employmentDate);
//         // if (isNaN(employmentDate.getTime())) {
//         //    res
//         //     .status(400)
//         //     .json({ error: "Invalid date format for employmentDate" });
//         // }
//         // let birthday: Date | null = null;
//         // if (newEmployeeData.birthday) {
//         //   const parsedBirthday = dayjs(newEmployeeData.birthday, "D/M/YYYY");
//         //   if (parsedBirthday.isValid()) {
//         //     birthday = parsedBirthday.toDate();
//         //   } else {
//         //     console.error(
//         //       "Invalid date format for birthday:",
//         //       newEmployeeData.birthday
//         //     );
//         //      res
//         //       .status(400)
//         //       .json({ error: "Invalid date format for birthday" });
//         //   }
//         // }
//     const otp = generateOTP();

//     // hash the otp
//     const hashedOTP = await bcrypt.hash(otp, 10);

//     // Calculate leave balances
//     const employmentDate = new Date(newEmployeeData.employmentDate);
//     const currentYear = new Date().getFullYear();
//     const yearOffset = currentYear - employmentDate.getFullYear();
//     //  console.log("employee  "+ newEmployeeData)
//     // Fetch all leave types with credit
//     const leaveTypes = await LeaveBalanceModel.find(
//       {},
//       { leaveType: 1, credit: 1, _id: 0 }
//     );

//     // Calculate the leave balances for the current year only
//     const balances = leaveTypes.map((type) => ({
//       leaveType: type.leaveType,
//       credit: type.credit + yearOffset,
//       used: 0,
//       available: type.credit + yearOffset,
//     }));

//     const leaveBalances = [
//       {
//         year: currentYear,
//         balances,
//       },
//     ];

//     const newEmployee = new Employee({
//       ...newEmployeeData,
//       password: hashedOTP,
//       leaveBalances,
//       photo: req.file?.path,
//     });

//     // Check the security
//     if (newEmployeeData.department === "security") {
//       const securityInfo = {
//         department: newEmployeeData.department,
//         email: newEmployeeData.email,
//         name: newEmployeeData.firstName,
//       };
//       const newLeaveInfo = new SecurityModel(securityInfo);
//       if (newLeaveInfo) {
//         await newLeaveInfo.save();
//       }
//     }

//     await newEmployee.save();

//         // Send OTP to user's email
//     await sendOTPEmail(newEmployee.email, otp);

//     res
//       .status(201)
//       .json({ message: "Employee saved successfully, OTP sent", newEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEmployeeData = req.body;
    const email = req.body.email;

    // Check if Employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      res
        .status(400)
        .json({ message: "Employee with this email already exists" });
      return;
    }
    // Ensure birthday is formatted as a strings
    if (newEmployeeData.birthday instanceof Date) {
      newEmployeeData.birthday = newEmployeeData.birthday
        .toISOString()
        .split("T")[0];
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Ensure birthday is formatted as a string
    if (newEmployeeData.birthday instanceof Date) {
      newEmployeeData.birthday = newEmployeeData.birthday
        .toISOString()
        .split("T")[0];
    }


    // Calculate leave balances
    const employmentDate = new Date(newEmployeeData.employmentDate);
    const currentYear = new Date().getFullYear();
    const yearOffset = currentYear - employmentDate.getFullYear();
    const leaveTypes = await LeaveBalanceModel.find(
      {},
      { leaveType: 1, credit: 1, _id: 0 }
    );
    const balances = leaveTypes.map((type) => ({
      leaveType: type.leaveType,
      credit: type.credit + yearOffset,
      used: 0,
      available: type.credit + yearOffset,
    }));
    const leaveBalances = [{ year: currentYear, balances }];
    console.log("photooooo ", req.file)
    // Create new Employee instance
    const newEmployee = new Employee({
      ...newEmployeeData,
      password: hashedOTP,
      leaveBalances,
      photo: req.file?.path,
      status: "active",
    });

    // Check the security
    if (newEmployeeData.department === "security") {
      const securityInfo = {
        department: newEmployeeData.department,
        email: newEmployeeData.email,
        name: newEmployeeData.firstName,
      };
      const newLeaveInfo = new SecurityModel(securityInfo);
      if (newLeaveInfo) {
        await newLeaveInfo.save();
      }
    }
    console.log("newEmployeeData", newEmployeeData);

    // Save new employee
    await newEmployee.save();

    // Send OTP to user's email
    await sendOTPEmail(newEmployee.email, otp);

    res
      .status(201)
      .json({ message: "Employee saved successfully, OTP sent", newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deactivateEmployee = async (req: Request, res: Response): Promise<void> => {
  console.warn("reacehed backend");
  try {
    const { employeeId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      res.status(400).json({ message: "Deactivation reason is required" });
      return;
    }

    const employee = await Employee.findOne({empId : employeeId});
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    employee.status = "inactive";
    employee.deactivationReason = reason;
    await employee.save();

    res.status(200).json({ message: "Employee deactivated successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    console.log(email,"  " ,password);
    const employee = await Employee.findOne({ email: email });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Ensure failedLoginAttempts is initialized
    if (typeof employee.failedLoginAttempts !== "number") {
      employee.failedLoginAttempts = 0;
    }

    // Check if account is locked
    if (
      employee.locked &&
      employee.lockedUntil &&
      employee.lockedUntil.getTime() > Date.now()
    ) {
      res
        .status(401)
        .json({ message: "Account locked. Please try again later." });
      return;
    }

    // Check if the password matches
    if (employee.password && typeof employee.password === "string") {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        employee.failedLoginAttempts =
          (employee.failedLoginAttempts as number) + 1;

        if ((employee.failedLoginAttempts as number) >= MAX_LOGIN_ATTEMPTS) {
          employee.locked = true;
          employee.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
        }

        await employee.save();
        res
          .status(401)
          .json({
            message: employee.locked
              ? "Account locked. Please try again later."
              : "Invalid credentials",
          });
        return;
      }
    } else {
      res.status(500).json({ error: "Invalid employee password" });
      return;
    }

    // Reset failed login attempts
    employee.failedLoginAttempts = 0;
    employee.locked = false;
    employee.lockedUntil = undefined;
    await employee.save();

    // Check if the password is the OTP and hasn't been changed
    if (!employee.passwordChanged) {
      res.status(403).json({ message: "Password change required" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, email, role: employee.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "3d" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, role: employee.role, employeeId: employee.empId, ObjId: employee._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const changePasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, newPassword } = req.body;

    // Validate new password
    if (newPassword.length < 8) {
      res
        .status(400)
        .json({ message: "Password must be at least 12 characters long" });
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(newPassword)) {
      res
        .status(400)
        .json({
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
      return;
    }

    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password and set passwordChanged to true
    employee.password = hashedPassword;
    employee.passwordChanged = true;
    await employee.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const forgotPasswordRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    // Check if the employee exists with the provided email
    const employee = await Employee.findOne({ email });
    console.log(email)
    console.log(employee?.empId)
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Notify HR staff about the password reset request
    const hrStaffMembers = await HRStaff.find({ role: "staff" });
    const notificationPromises = hrStaffMembers.map(async (hrStaff) => {
      await NotificationService.createNotification(
        hrStaff._id.toString(),
        "Password Reset Request",
        `Employee ${employee.firstName} ${employee.lastName} (Email: ${employee.email}, ID: ${employee._id}) has requested a password reset.`
      );
    });

    await Promise.all(notificationPromises);

    res
      .status(200)
      .json({
        message: "Password reset request notification sent to HR staff",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const passwordResetApprove = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, status } = req.body;

    // Check if the employee exists with the provided email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    if (status !== "approved") {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { id: employee._id, email: employee.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "5m" }
    );

    // Create a reset link
    const resetLink = `${process.env.FRONTEND_URL}reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = `
      <p>Dear ${employee.firstName} ${employee.lastName},</p>
      <p>You have requested to reset your password. Please click the link below to reset your password. This link will expire in 5 minutes.</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,</p>
      <p>Your Company Name</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employee.email,
      subject: "Password Reset Request",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link sent to the employee's email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    // Verify the reset token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        email: string;
      };
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    // Find the employee by ID
    const employee = await Employee.findById(payload.id);
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the employee's password and set passwordChanged to true
    employee.password = hashedPassword;
    employee.passwordChanged = true;
    await employee.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    // console.log("Fetched Data:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmpById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findOne({empId: req.params.id});
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    // console.log("Fetched Data:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};
const getAllEmployeesForDepartmentHead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentHeadId } = req.params;

    // Fetch the department head details
    const departmentHead = await Employee.findOne({
      empId: departmentHeadId,
      role: "department head",
    });

    if (!departmentHead) {
      res.status(404).json({ message: "Department head not found" });
      return;
    }

    const department = departmentHead.department;

    // Fetch employees in the same department as the department head, excluding the department head
    const employees = await Employee.find({
      department: department,
      empId: { $ne: departmentHeadId },
    });

    res.status(200).json(employees);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching employees for department head: ${error}`);
    next(error);
  }
};

const getAllEmployeesForManager = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { managerId } = req.params;

    // Fetch the manager details
    const manager = await Employee.findOne({
      empId: managerId,
      role: "manager",
    });

    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }

    // Fetch employees managed by the manager, excluding the manager's own information
    const employees = await Employee.find({
      manager: managerId,
      empId: { $ne: managerId },
    });

    res.status(200).json(employees);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching employees for manager: ${error}`);
    next(error);
  }
};

const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating employee");
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (employee) {
      await employee.save();
      res
        .status(200)
        .json({ message: "Employee updated successfully", employee });

        await NotificationService.createNotification(
          employee._id.toString(),
          'Information Update',
          'Your information has been updated.'
        );
  
        // Send email notification to the employee
        if (employee.email) {
          await NotificationService.sendEmailNotification(
            employee.email,
            'Information Update',
            'Your information has been updated.'
          );
        }
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createEvaluation = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       employeeId,
//       workQuality,
//       productivity,
//       communication,
//       collaboration,
//       punctuality,
//       evaluationYear,
//     } = req.body;

//     // Calculate the total score
//     const total =
//       (workQuality +
//         productivity +
//         communication +
//         collaboration +
//         punctuality) *
//       0.25;

//     // Update the employee document with the new evaluation
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (!employee) {
//       res.status(404).json({ error: "Employee not found" });
//       return;
//     }

//     // Add the evaluation to the evaluations array
//     const evaluation = {
//       employeeId,
//       workQuality,
//       productivity,
//       communication,
//       collaboration,
//       punctuality,
//       evaluationYear,
//       total,
//     };
//     employee.evaluations.push(evaluation);

//     await employee.save();

//     res
//       .status(201)
//       .json({ message: "Evaluation added successfully", evaluation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const createEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      workQuality,
      productivity,
      communication,
      collaboration,
      punctuality,
      evaluationYear,
    } = req.body;

    // Calculate the total score
    const total = (
      workQuality +
      productivity +
      communication +
      collaboration +
      punctuality
    ) * 0.25;

    // Update the employee document with the new evaluation
    const employee = await Employee.findOne({ empId: id });
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    // Add the evaluation to the evaluations array
    const evaluation = {
      employeeId: id,
      workQuality,
      productivity,
      communication,
      collaboration,
      punctuality,
      evaluationYear,
      total,
    };
    employee.evaluations.push(evaluation);

    await employee.save();

    res
      .status(201)
      .json({ message: "Evaluation added successfully", evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEvaluationByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ empId: id });
    console.log(employee)
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    const evaluations = employee.evaluations;
    res.status(200).json({ evaluations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getAllEmployeesForDepartmentHead,
  getAllEmployeesForManager,
  getEmployeeById,
  getEmpById,
  createEvaluation,
  getEvaluationByEmployeeId,
  changePasswordController,
  loginController,
  forgotPasswordRequest,
  passwordResetApprove,
  resetPassword,
  deactivateEmployee,
};
