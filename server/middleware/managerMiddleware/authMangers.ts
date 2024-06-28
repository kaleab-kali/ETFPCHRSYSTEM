import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Employee from '../../models/employeeModel';

declare global {
  namespace Express {
    interface Request {
      employee?: any;
    }
  }
}

const authDepartmentUserProtect = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  let token;
  let employee;
  let decoded: jwt.JwtPayload | null = null;

  if (req.headers.authorization && req.headers.authorization.trim().startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      employee = await Employee.findById(decoded.id);
      if (!employee) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      req.employee = employee;
      next();
    } catch (error) {
      if (!decoded || !(await Employee.findById(decoded.id))) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      return res.status(500).send('Ooops!! Something Went Wrong, Try again...');
    }
  }
  if (!token) {
    return res.status(401).send('Not Authorized without token');
  }
};

export default authDepartmentUserProtect;
