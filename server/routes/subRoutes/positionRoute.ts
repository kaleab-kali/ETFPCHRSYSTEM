import express from "express";
import {
  createPosition,
  deletePosition,
  getAllPositions,
  getPositionById,
  updatePosition,
} from "../../controllers/dynamicControllers/positionController";

const router = express.Router();

// Create a new position
router.post("/", createPosition);

// Get all positions
router.get("/", getAllPositions);

// Get a specific position by ID
router.get("/:id", getPositionById);

// Update a position by ID
router.put("/:id", updatePosition);

// Delete a position by ID
router.delete("/:id", deletePosition);

export default router;