import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/employeeModel';
import { Department } from '../../models/departmentModel';

const checkManagerOrDepartmentHeadWithControl = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  if (!req.employee.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role, empId, department: headDepartment } = req.employee;
  const { id } = req.params;
  
  const employee = await Employee.findOne({empId: id});
  
  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  if (role === 'manager' && employee.manager === empId) {
    return next();
  }

  if (role === 'department head' && employee.department === headDepartment) {
    return next();
  }

  return res.status(401).send('Not Authorized to manage this employee');
};

export default checkManagerOrDepartmentHeadWithControl;
