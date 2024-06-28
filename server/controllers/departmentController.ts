import { Request, Response } from "express";
import { Department, DepartmentDocument } from "../models/departmentModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import { Roles } from "../models/employeeModel";

// Create a new department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentName, departmentHead } = req.body;
    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const newDepartment = new Department({ departmentName, departmentHead });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a department by ID
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({ departmentID: id });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all departments
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update or assign a department head
export const updateOrAssignDepartmentHead = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { departmentHead } = req.body;

    if (!departmentHead) {
      return res.status(400).json({ message: "Department head is required" });
    }

    const department = await Department.findOne({ departmentID: id });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const employee = await Employee.findOne({ empId: departmentHead });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.department !== department.departmentName) {
      employee.department = department.departmentName;
    }

    employee.role = Roles.DepartmentHead;
    await employee.save();

    department.departmentHead = departmentHead;
    await department.save();

    res.status(200).json({ department, employee });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a department by ID
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await Department.findOneAndDelete({ departmentID: id });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Find all employees in the department
    const employees = await Employee.find({
      department: department.departmentName,
    });

    if (employees.length > 0) {
      for (const employee of employees) {
        if (employee.role === Roles.DepartmentHead) {
          employee.role = Roles.Employee;
        }
        employee.department = "";
        await employee.save();
      }
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const assignManagers = async (req: Request, res: Response) => {
  try {
    const { employeeId, departmentName } = req.body;

    // Find the department by departmentName
    const department = await Department.findOne({ departmentName });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Find the employee by empId
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.department !== department.departmentName) {
      employee.department = department.departmentName;
    }

    employee.role = Roles.Manager;
    employee.manager = department.departmentHead;
    await employee.save();

    // Add the employeeId to the managers list if not already present
    if (!department.managers.includes(employeeId)) {
      department.managers.push(employeeId);
      await department.save();
    }

    res
      .status(200)
      .json({ message: "Manager assigned successfully", department });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const assignManagerToEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId, managerId } = req.body;

    // Check if both employee and manager exist
    const employee = await Employee.findOne({ empId: employeeId });
    const manager = await Employee.findOne({ empId: managerId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Check if manager's department matches the department in the Department schema
    const department = await Department.findOne({
      departmentName: manager.department,
    });
    console.log(manager.department);
    console.log("manager Info", manager);
    console.log("leave", department);

    if (!department) {
      return res
        .status(404)
        .json({ message: "Department not found for the manager" });
    }

    // Check if the managerId is in the managers array of the department
    if (!department.managers.includes(managerId)) {
      return res
        .status(400)
        .json({
          message: "Manager is not listed in the department's managers",
        });
    }

    // Check if the employee's department matches the manager's department
    if (employee.department !== manager.department) {
      return res
        .status(400)
        .json({
          message: "Employee and manager are not in the same department",
        });
    }

    // Assign the manager to the employee
    employee.manager = managerId;
    await employee.save();

    res
      .status(200)
      .json({ message: "Manager assigned to employee successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDepartmentName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    if (!departmentName) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const department = await Department.findOne({ departmentID: id });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const oldDepartmentName = department.departmentName;
    department.departmentName = departmentName;
    await department.save();

    // Update the department name in all employees belonging to this department
    await Employee.updateMany(
      { department: oldDepartmentName },
      { $set: { department: departmentName } }
    );

    res
      .status(200)
      .json({ message: "Department name updated successfully", department });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
