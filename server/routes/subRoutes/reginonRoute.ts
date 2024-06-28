import express from "express";
import {
  createRegion,
  deleteRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
} from "../../controllers/dynamicControllers/regionController";

const router = express.Router();

// Create a new region
router.post("/", createRegion);

// Get all regions
router.get("/", getAllRegions);

// Get a specific region by ID
router.get("/:id", getRegionById);

// Update a region by ID
router.put("/:id", updateRegion);

// Delete a region by ID
router.delete("/:id", deleteRegion);

export default router;