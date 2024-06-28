import { Request, Response } from "express";
import { SalaryLimits, SalaryLimitsDocument } from "../models/salaryLimitModel";

const createSalaryLimit = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, salaryLimit } = req.body;
      const existingLimit = await SalaryLimits.findOne({ title });
      if (existingLimit) {
        res.status(400).json({ message: "Salary limit for this title already exists" });
        return;
      }
      const newSalaryLimit: SalaryLimitsDocument = new SalaryLimits({ title, salaryLimit });
      await newSalaryLimit.save();
      res.status(201).json(newSalaryLimit);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };  

const getAllSalaryLimits = async (req: Request, res: Response): Promise<void> => {
  try {
    const salaryLimits: SalaryLimitsDocument[] = await SalaryLimits.find();
    res.status(200).json(salaryLimits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSalaryLimit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, salaryLimit } = req.body;
    const updatedSalaryLimit: SalaryLimitsDocument | null = await SalaryLimits.findOneAndUpdate(
      { title },
      { salaryLimit },
      { new: true }
    );
    if (!updatedSalaryLimit) {
      res.status(404).json({ message: "Salary limit not found" });
      return;
    }
    res.status(200).json(updatedSalaryLimit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createSalaryLimit, getAllSalaryLimits, updateSalaryLimit };
