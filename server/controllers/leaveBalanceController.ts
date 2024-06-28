import { Request, Response } from "express";
import LeaveBalanceModel from "../models/leaveBalanceModel"; 


const createLeaveBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leaveType, credit, used, available } = req.body;
    console.log("Adding", req.body);

    const newLeaveBalance = new LeaveBalanceModel({
      leaveType: leaveType.trim(),
      credit,
      used,
      available,
    });
    await newLeaveBalance.save();

    res
      .status(201)
      .json({
        message: "Leave balance added successfully",
        data: newLeaveBalance,
      });
  } catch (error) {
    console.error("Error adding leave balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLeaveBalances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const leaveBalances = await LeaveBalanceModel.find();
    res.status(200).json(leaveBalances);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateLeaveBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { leaveType, credit, used, available } = req.body;
    console.log("updated will be", req.body);

    // Build the update object dynamically based on the provided fields
    const updateFields: { [key: string]: any } = {};
    if (credit !== undefined) updateFields.credit = credit;
    if (used !== undefined) updateFields.used = used;
    if (available !== undefined) updateFields.available = available;

    const updatedLeaveBalance = await LeaveBalanceModel.findOneAndUpdate(
      { leaveType: leaveType.trim() }, // Ensure leaveType is matched correctly, trim whitespace
      { $set: updateFields },
      { new: true }
    );

    if (!updatedLeaveBalance) {
      res.status(404).json({ message: "Leave balance not found" });
      return;
    }

    res
      .status(200)
      .json({
        message: "Leave balance updated successfully",
        data: updatedLeaveBalance,
      });
  } catch (error) {
    console.error("Error updating leave balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteLeaveBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { leaveType } = req.params;

    const deletedLeaveBalance = await LeaveBalanceModel.findOneAndDelete({
      leaveType: leaveType.trim(),
    });

    if (!deletedLeaveBalance) {
      res.status(404).json({ message: "Leave balance not found" });
      return;
    }

    res.status(200).json({ message: "Leave balance deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export { getAllLeaveBalances, updateLeaveBalance, createLeaveBalance ,deleteLeaveBalance};