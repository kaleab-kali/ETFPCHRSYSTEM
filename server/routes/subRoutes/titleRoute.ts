import express, { Router } from "express";
import { createTitle, deleteTitle, getAllTitles, getTitleById, updateTitle } from "../../controllers/dynamicControllers/titleController";

const router: Router = express.Router();

// Create an Title registration
router.post("/", createTitle);

// Get all Titles
router.get("/", getAllTitles);

// Get a specific Title by ID
router.get("/:id", getTitleById);

// Update an Title by ID
router.put("/:id", updateTitle);

// Delete an Title by ID
router.delete("/:id", deleteTitle);

export default router;