import { Request, Response } from "express";
import InstituteModel, {
  InstituteInfo,
} from "../../models/dynamicModel/instituteModel";

const createInstitute = async (req: Request, res: Response): Promise<void> => {
  try {
    const newInstitute = new InstituteModel(req.body);
    await newInstitute.save();
    res
      .status(201)
      .json({ message: "Institute saved successfully", newInstitute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInstituteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const institute = await InstituteModel.findById(req.params.id);
    if (!institute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }
    res.status(200).json(institute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllInstitutes = async (req: Request, res: Response): Promise<void> => {
  try {
    const institutes = await InstituteModel.find();
    res.status(200).json(institutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateInstitute = async (req: Request, res: Response): Promise<void> => {
  try {
    const institute = await InstituteModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (institute) {
      await institute.save();
      res
        .status(200)
        .json({ message: "Institute updated successfully", institute });
    } else {
      res.status(404).json({ error: "Institute not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteInstitute = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedInstitute = await InstituteModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInstitute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }
    res.status(200).json({
      message: "Institute deleted successfully",
      deletedInstitute,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createInstitute,
  getInstituteById,
  getAllInstitutes,
  updateInstitute,
  deleteInstitute,
};