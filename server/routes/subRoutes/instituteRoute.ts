import express from "express";
import {
  createInstitute,
  deleteInstitute,
  getAllInstitutes,
  getInstituteById,
  updateInstitute,
} from "../../controllers/dynamicControllers/instituteController";

const router = express.Router();

// Create a new institute
router.post("/", createInstitute);

// Get all institutes
router.get("/", getAllInstitutes);

// Get a specific institute by ID
router.get("/:id", getInstituteById);

// Update an institute by ID
router.put("/:id", updateInstitute);

// Delete an institute by ID
router.delete("/:id", deleteInstitute);

export default router;