import Employee from '../models/employeeModel';
import { Types } from 'mongoose';

export const getManagerIds = async (managerId: string): Promise<Types.ObjectId> => {
  try {
    const employee = await Employee.findOne({ empId: managerId }).select('_id');
    if (employee) {
      return employee._id;
    } else {
      throw new Error('Employee not found');
    }
  } catch (error) {
    console.error('Error fetching employee managers IDs:', error);
    throw new Error('Failed to fetch employee managers IDs');
  }
};
