import express, { Router } from "express";
import {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
} from "../controllers/appraisalHistoryController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';
import checkHrStaffRole from "../middleware/adminMiddleware/authHrstaffMiddleware";

const router: Router = express.Router();

// Create appraisal information
router.post("/", authAdminProtect, checkHrManagerRole, createAppraisalHistory);

// Get appraisal information for a specific employee by ID
router.get("/employee/:employeeId", getAppraisalHistoryByEmployeeId);

// Get all appraisal information
router.get("/", authAdminProtect, checkHrStaffRole, getAllAppraisalHistory);

export default router;
