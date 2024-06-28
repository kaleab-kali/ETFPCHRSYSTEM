// authRoleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const checkHrStaffRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  // Check for invalid user token
  console.log("dhf jfjdnj ")
  if (!req.hrStaff.role) {
    return res.status(401).send('Not Authorized for users');
  }
  console.log("dhf jfjdnj ");

  const { role } = req.hrStaff;
  // Admins are allowed to continue
  if (role === 'hrmanager' || role === 'staff') {
    return next();
  }
  // Other roles are not allowed
  return res.status(401).send('Not Authorized');
};

export default checkHrStaffRole;
