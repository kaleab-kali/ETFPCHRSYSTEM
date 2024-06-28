import express, { Router } from "express";
import {
    createSalaryRaise,
    updateSalaryRaiseStatus,
    getAllSalaryRaises,
} from "../controllers/salaryRaiseController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';

const router: Router = express.Router();

// Create a new salary limit
router.post("/", authAdminProtect, checkHrManagerRole, createSalaryRaise);

// Get all salary raises
router.get("/", authAdminProtect, getAllSalaryRaises);

// Update an existing salary Raise
router.put("/:id", authAdminProtect, checkHrManagerRole,updateSalaryRaiseStatus);

export default router;
