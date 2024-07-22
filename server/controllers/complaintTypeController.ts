import { Request, Response } from "express";
import ComplaintType, { ComplaintTypeDocument } from "../models/complaintType";

export const createComplaintType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, category } = req.body;

        const newComplaintType = new ComplaintType({ name, type, category });
        await newComplaintType.save();

        res.status(201).json(newComplaintType);
    } catch (error) {
        res.status(500).json({ message: "Error creating complaint type", error });
    }
};

export const getComplaintTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const complaintTypes = await ComplaintType.find();
        res.status(200).json(complaintTypes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaint types", error });
    }
};

export const updateComplaintType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, type, category } = req.body;

        const updatedComplaintType = await ComplaintType.findByIdAndUpdate(
            id,
            { name, type, category },
            { new: true, runValidators: true }
        );

        if (!updatedComplaintType) {
            res.status(404).json({ message: "Complaint type not found" });
            return;
        }

        res.status(200).json(updatedComplaintType);
    } catch (error) {
        res.status(500).json({ message: "Error updating complaint type", error });
    }
};
