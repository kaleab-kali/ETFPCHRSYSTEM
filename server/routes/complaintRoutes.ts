import express, { Router } from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintByEmployeeId,
  getComplaintById,
//   updateComplaint,
//   deleteComplaint,
} from "../controllers/complaintController";
import authDepartmentUserProtect from "../middleware/managerMiddleware/authMangers";
import checkManagerOrDepartmentHeadWithControl from "../middleware/managerMiddleware/authHeadManager";
import authAdminProtect from "../middleware/adminMiddleware/authAdminMiddleware";

const router: Router = express.Router();

// Create a new complaint
router.post("/", createComplaint);

// Get all complaints
router.get("/", authAdminProtect, getAllComplaints);

// Get a complaint by Employee ID
router.get("/employee/:id",authAdminProtect, getComplaintByEmployeeId);

// Get a complaint by ID
router.get("/:id", authAdminProtect, getComplaintById);

// Update a complaint by ID
//router.put("/:id", updateComplaint);

// Delete a complaint by ID
//router.delete("/:id", deleteComplaint);

export default router;

