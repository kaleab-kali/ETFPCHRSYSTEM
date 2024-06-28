import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HRStaff from '../../models/hrstaffModel';
import Employee from '../../models/employeeModel'; // Assuming you have an Employee model

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type according to your user model
    }
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string; };
    let user = await HRStaff.findById(decoded.id);
    
    if (!user) {
      user = await Employee.findById(decoded.id); // Check the Employee collection if not found in INVStaff
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
