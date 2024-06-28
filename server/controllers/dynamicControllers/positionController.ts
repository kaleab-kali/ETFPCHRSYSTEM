import { Request, Response } from "express";
import PositionModel, {
  PositionInfo,
} from "../../models/dynamicModel/positionModel";

const createPosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPosition = new PositionModel(req.body);
    await newPosition.save();
    res
      .status(201)
      .json({ message: "Position saved successfully", newPosition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPositionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const position = await PositionModel.findById(req.params.id);
    if (!position) {
      res.status(404).json({ error: "Position not found" });
      return;
    }
    res.status(200).json(position);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPositions = async (req: Request, res: Response): Promise<void> => {
  try {
    const positions = await PositionModel.find();
    res.status(200).json(positions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const position = await PositionModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (position) {
      await position.save();
      res
        .status(200)
        .json({ message: "Position updated successfully", position });
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPosition = await PositionModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPosition) {
      res.status(404).json({ error: "Position not found" });
      return;
    }
    res.status(200).json({
      message: "Position deleted successfully",
      deletedPosition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createPosition,
  getPositionById,
  getAllPositions,
  updatePosition,
  deletePosition,
};