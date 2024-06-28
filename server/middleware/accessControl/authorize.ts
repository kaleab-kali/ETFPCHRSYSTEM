import { Request, Response, NextFunction } from 'express';

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export default authorize;