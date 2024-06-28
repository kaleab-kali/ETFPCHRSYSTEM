import { Request, Response } from "express";
import SalaryRaise, { SalaryRaiseDocument } from "../models/salaryRaiseModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import { SalaryLimitsDocument, SalaryLimits } from "../models/salaryLimitModel";
import NotificationService from '../services/notificationService';

const createSalaryRaise = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all employees
    const employees: EmployeeDocument[] = await Employee.find();

    // Fetch salary limits
    const salaryLimits: SalaryLimitsDocument[] = await SalaryLimits.find();

    // Filter employees based on eligibility criteria
    const eligibleEmployees: EmployeeDocument[] = employees.filter((employee) =>
      isEligibleForSalaryRaise(employee, salaryLimits)
    );

    // Calculate new salary for eligible employees
    const salaryRaiseData: SalaryRaiseDocument[] = eligibleEmployees.map((employee) => {
      const newSalary = Math.round(parseInt(employee.salary) * 1.03); // 3% increase
      return {
        employeeId: employee.empId,
        title: employee.title,
        currentSalary: parseInt(employee.salary),
        newSalary: newSalary,
        salaryRaiseTime: new Date(),
        status: "pending",
      } as SalaryRaiseDocument; // Explicitly type the object as SalaryRaiseDocument
    });

    // Create salary raise records
    const newSalaryRaises: SalaryRaiseDocument[] = await SalaryRaise.insertMany(salaryRaiseData);

    res.status(201).json({ message: "Salary raises created successfully", salaryRaises: newSalaryRaises });
  } catch (error) {
    console.error("Error creating salary raises:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isEligibleForSalaryRaise = (employee: EmployeeDocument, salaryLimits: SalaryLimitsDocument[]): boolean => {
    if (!employee.lastSalaryRaise) {
      // Check employment date if no previous salary raise
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      return (
        employee.employmentDate &&
        employee.employmentDate <= twoYearsAgo &&
        checkSalaryAgainstLimit(employee.title, employee.salary, salaryLimits) || false
      );
    } else {
      // Check if two years have passed since last salary raise
      const twoYearsAgo = new Date(employee.lastSalaryRaise);
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() + 2);
      return twoYearsAgo <= new Date() && checkSalaryAgainstLimit(employee.title, employee.salary, salaryLimits);
    }
  };
   
const checkSalaryAgainstLimit = (
  title: string,
  currentSalary: string,
  salaryLimits: SalaryLimitsDocument[]
): boolean => {
  const salaryLimit = salaryLimits.find((limit) => limit.title === title);
  return salaryLimit ? parseInt(currentSalary) < salaryLimit.salaryLimit : false;
};

// const updateSalaryRaiseStatus = async (req: Request, res: Response) => {
//   //const {employeeId}  = req.param.id;
//   const { status } = req.body;

//   try {
//     const salaryRaise: SalaryRaiseDocument | null = await SalaryRaise.findOne({
//       employeeId: req.params.id,
//     });
//     if (!salaryRaise) {
//       return res
//         .status(404)
//         .json({ message: "Salary raise request not found" });
//     }

//     if (status !== "accepted" && status !== "rejected") {
//       return res
//         .status(400)
//         .json({
//           message: "Invalid status. Status must be 'accepted' or 'rejected'",
//         });
//     }

//     let notificationTitle = 'Salary Raise Request';
//     let notificationMessage = '';

//     if (status === "accepted") {
//       // Update employee's salary and last salary raise date
//       const employee = await Employee.findOne({
//         empId: salaryRaise.employeeId,
//       });
//       if (!employee) {
//         return res.status(404).json({ message: "Employee not found" });
//       }

//       employee.salary = String(salaryRaise.newSalary);
//       employee.lastSalaryRaise = new Date();
//       await employee.save();
//     }

//     salaryRaise.status = status;
//     await salaryRaise.save();

//     return res
//       .status(200)
//       .json({ message: "Salary raise request updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const updateSalaryRaiseStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  try {
    const salaryRaise = await SalaryRaise.findOne({
      employeeId: req.params.id,
    });
    if (!salaryRaise) {
      return res.status(404).json({ message: "Salary raise request not found" });
    }

    if (!salaryRaise.employeeId) {
      return res.status(400).json({ message: "Employee ID is missing from the salary raise request" });
    }

    if (status !== "accepted" && status !== "rejected") {
      return res.status(400).json({ message: "Invalid status. Status must be 'accepted' or 'rejected'" });
    }

    let notificationTitle = 'Salary Raise Request';
    let notificationMessage = '';

    if (status === "accepted") {
      // Update employee's salary and last salary raise date
      const employee = await Employee.findOne({
        empId: salaryRaise.employeeId,
      });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      employee.salary = String(salaryRaise.newSalary);
      employee.lastSalaryRaise = new Date();
      await employee.save();

      notificationTitle = 'Salary Raise Accepted';
      notificationMessage = `Your salary raise request has been accepted. Your new salary is ${salaryRaise.newSalary}.`;

    } else if (status === "rejected") {
      notificationTitle = 'Salary Raise Rejected';
      notificationMessage = `Your salary raise request has been rejected.`;
    }

    salaryRaise.status = status;
    await salaryRaise.save();

    // const employee
    const employee = await Employee.findOne({
      empId: salaryRaise.employeeId,
    });
    if (employee){
    // Send notification to the employee about the salary raise status
    await NotificationService.createNotification(
      employee._id.toString(),
      notificationTitle,
      notificationMessage
    );
  }
    return res.status(200).json({ message: "Salary raise request updated successfully" });
  } catch (error) {
    console.error('Error updating salary raise status:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
  
const getAllSalaryRaises = async (req: Request, res: Response) => {
    try {
      const salaryRaises: SalaryRaiseDocument[] = await SalaryRaise.find();
      return res.status(200).json(salaryRaises);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export {createSalaryRaise, updateSalaryRaiseStatus, getAllSalaryRaises };
