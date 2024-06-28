import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/employeeModel';
import { Department } from '../../models/departmentModel';

const checkManagerRoleWithControl = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  if (!req.employee.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role, empId } = req.employee;
  const { employeeId } = req.params; // Assuming the ID of the employee to be managed is passed as a URL parameter

  if (role === 'manager') {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    if (employee.manager === empId) {
      return next();
    } else {
      return res.status(401).send('Not Authorized to manage this employee');
    }
  }
  return res.status(401).send('Not Authorized');
};

export default checkManagerRoleWithControl;
