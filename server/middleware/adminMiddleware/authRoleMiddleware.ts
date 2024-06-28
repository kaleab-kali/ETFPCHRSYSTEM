// authRoleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const checkRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  // Check for invalid user token
  if (!req.hrStaff.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role } = req.hrStaff;
  // Admins are allowed to continue
  if (role === 'admin') {
    return next();
  }
  // HRManagers can create staff
  if (role === 'hrmanager' ) {
    return next();
  }
  // Other roles are not allowed
  return res.status(401).send('Not Authorized');
};

export default checkRole;