import { Request, Response } from "express";
import RegionModel, { RegionInfo } from "../../models/dynamicModel/regionModel";

const createRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRegion = new RegionModel(req.body);
    await newRegion.save();
    res.status(201).json({ message: "Region saved successfully", newRegion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const region = await RegionModel.findById(req.params.id);
    if (!region) {
      res.status(404).json({ error: "Region not found" });
      return;
    }
    res.status(200).json(region);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions = await RegionModel.find();
    res.status(200).json(regions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const region = await RegionModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (region) {
      await region.save();
      res.status(200).json({ message: "Region updated successfully", region });
    } else {
      res.status(404).json({ error: "Region not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRegion = await RegionModel.findByIdAndDelete(req.params.id);
    if (!deletedRegion) {
      res.status(404).json({ error: "Region not found" });
      return;
    }
    res.status(200).json({
      message: "Region deleted successfully",
      deletedRegion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createRegion,
  getRegionById,
  getAllRegions,
  updateRegion,
  deleteRegion,
};