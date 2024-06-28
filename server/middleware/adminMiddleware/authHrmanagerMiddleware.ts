// authRoleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const checkHrManagerRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  // Check for invalid user token
  if (!req.hrStaff.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role } = req.hrStaff;
  // Admins are allowed to continue
  if (role === 'hrmanager') {
    return next();
  }
  // Other roles are not allowed
  return res.status(401).send('Not Authorized');
};

export default checkHrManagerRole;
