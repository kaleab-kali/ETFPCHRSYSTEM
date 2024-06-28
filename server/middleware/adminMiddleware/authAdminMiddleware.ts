import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HRStaff from '../../models/hrstaffModel';

declare global {
  namespace Express {
    interface Request {
      hrStaff?: any; // Define hrStaff property on Request object
    }
  }
}

const authAdminProtect = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  let token;
  let hrStaff;
  let decoded: jwt.JwtPayload | null = null; // Initialize decoded to null

  if (req.headers.authorization && req.headers.authorization.trim().startsWith('Bearer')) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      // Get HRStaff from Token
      hrStaff = await HRStaff.findById(decoded.id);
      if (!hrStaff) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      // Pass HRStaff object to next middleware
      req.hrStaff = hrStaff;
      next();
    } catch (error) {
      if (!decoded || !(await HRStaff.findById(decoded.id))) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      return res.status(500).send('Ooops!! Something Went Wrong, Try again...');
    }
  }
  if (!token) {
    return res.status(401).send('Not Authorized without token');
  }
};

export default authAdminProtect;
