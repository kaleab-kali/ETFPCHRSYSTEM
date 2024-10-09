import express, { Router } from "express";
import {
  createDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController";

const router: Router = express.Router();

router.post("/", createDocument);
router.get("/", getAllDocuments);
router.get("/:id", getDocument);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

export default router;
