import { Request, Response } from "express";
import LetterDoc from "../models/documentModel";
import upload from "../middleware/docMulter";

export const createDocument = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const newDocument = new LetterDoc({
        empId: req.body.empId,
        fromWhom: req.body.fromWhom,
        toWhom: req.body.toWhom,
        topic: req.body.topic,
        center: req.body.center,
        date: req.body.date,
        direction: req.body.direction,
        file: req.file?.path,
      });

      const savedDocument = await newDocument.save();
      res.status(201).json(savedDocument);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
};

// Get all documents
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await LetterDoc.find();
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ message: "Error fetching documents", error: err });
  }
};

// Get a single document by ID
export const getDocument = async (req: Request, res: Response) => {
  try {
    console.log("id", req.params.id);
    const document = await LetterDoc.find({toWhom : req.params.id,});
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ message: "Error fetching document", error: err });
  }
};

// Update a document by ID
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const updatedDocument = await LetterDoc.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: "Error updating document", error: err });
  }
};

// Delete a document by ID
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const deletedDocument = await LetterDoc.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting document", error: err });
  }
};
