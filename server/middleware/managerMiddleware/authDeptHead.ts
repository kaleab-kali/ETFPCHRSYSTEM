import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/employeeModel';
import { Department } from '../../models/departmentModel';

const checkDepartmentHeadRoleWithControl = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  if (!req.employee.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role, department: headDepartment } = req.employee;
  const { employeeId } = req.params; // Assuming the ID of the employee to be managed is passed as a URL parameter

  if (role === 'department head') {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    if (employee.department === headDepartment) {
      return next();
    } else {
      return res.status(401).send('Not Authorized to manage this employee');
    }
  }
  return res.status(401).send('Not Authorized');
};

export default checkDepartmentHeadRoleWithControl;
