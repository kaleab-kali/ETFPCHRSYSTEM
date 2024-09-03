import { Request, Response } from 'express';
import HRStaff from '../models/hrstaffModel';
import Employee from '../models/employeeModel'; // Assuming you have an Employee model

const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.user;

    if (user.role === 'admin' || user.role === 'hrmanager' || user.role === 'staff' || user.role === "committee") {
      const hrStaff = await HRStaff.findById(user._id);
      if (!hrStaff) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(hrStaff);
    } else {
      const employee = await Employee.findById(user._id);
      if (!employee) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(employee);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getProfile };
