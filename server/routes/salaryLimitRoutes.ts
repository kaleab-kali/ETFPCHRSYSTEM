import express, { Router } from "express";
import {
  createSalaryLimit,
  getAllSalaryLimits,
  updateSalaryLimit,
} from "../controllers/salaryLimitController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';

const router: Router = express.Router();

// Create a new salary limit
router.post("/", authAdminProtect, checkHrManagerRole, createSalaryLimit);

// Get all salary limits
router.get("/", authAdminProtect, getAllSalaryLimits);

// Update an existing salary limit
router.put("/", authAdminProtect, checkHrManagerRole, updateSalaryLimit);

export default router;
