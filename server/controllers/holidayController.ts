// controllers/holidayController.ts

import { Request, Response } from "express";
import Holiday from "../models/holidayModel";
import LeaveInfoModel, { LeaveInfo } from "../models/leaveModel";

export const getHolidays = async (req: Request, res: Response) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holidays" });
  }
};

export const addHoliday = async (req: Request, res: Response) => {
  const { date, description } = req.body;
  try {
    const holiday = new Holiday({ date, description });
    await holiday.save();

    // Fetch approved leaves that overlap with the new holiday
    const overlappingLeaves = await LeaveInfoModel.find({
      status: "approved",
      from: { $lte: new Date(date) },
      to: { $gte: new Date(date) },
    });

    for (const leave of overlappingLeaves) {
      // Extend the leave duration by one day for each overlapping holiday
      leave.to = new Date(leave.to!.getTime() + 24 * 60 * 60 * 1000);
      leave.days = leave.days! + 1;
      await leave.save();
    }

    res
      .status(201)
      .json({ message: "Holiday added and leaves updated", holiday });
  } catch (error) {
    res.status(500).json({ message: "Error adding holiday" });
  }
};
