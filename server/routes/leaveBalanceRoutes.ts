import express from "express";
import {
  createLeaveBalance,
  deleteLeaveBalance,
  getAllLeaveBalances,
  updateLeaveBalance,
} from "../controllers/leaveBalanceController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';

const router = express.Router();

// Route to create a leave balance
router.post("/", authAdminProtect, checkHrManagerRole, createLeaveBalance);

// Route to get all leave balances
router.get("/", authAdminProtect, getAllLeaveBalances);

// Route to update a leave balance
router.put("/", authAdminProtect, checkHrManagerRole, updateLeaveBalance);

router.delete("/:leaveType", authAdminProtect, checkHrManagerRole, deleteLeaveBalance);

export default router;