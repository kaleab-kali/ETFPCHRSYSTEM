import { Request, Response, NextFunction } from "express";
import TitleModel, { TitleInfo } from "../../models/dynamicModel/titleModel";
const createTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTitle = new TitleModel(req.body);

    await newTitle.save();

    res.status(201).json({ message: "Title saved successfully", newTitle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTitleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = await TitleModel.findById(req.params.id);
    if (!title) {
      res.status(404).json({ error: "Title not found" });
      return;
    }
    console.log("Fetched Data:", title);
    res.status(200).json(title);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTitles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const titles = await TitleModel.find();
    res.status(200).json(titles);
  } catch (err) {
    next(err);
  }
};

const updateTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating Title");
    const title = await TitleModel.findOneAndUpdate(
      { titleId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (title) {
      await title.save();
      res.status(200).json({ message: "Title updated successfully", title });
    } else {
      res.status(404).json({ error: "Title not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTitle = await TitleModel.findOneAndDelete({
      titleId: req.params.id,
    });
    if (!deletedTitle) {
      res.status(404).json({ error: "Title not found" });
      return;
    }
    res.status(200).json({
      message: "Title deleted successfully",
      deletedTitle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTitle, updateTitle, deleteTitle, getAllTitles, getTitleById };
