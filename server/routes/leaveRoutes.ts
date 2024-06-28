import express, { Router } from "express";
import {
  createLeaveInfo,
  getAllLeaveInfo,
  getLeaveInfoForDepartmentHead,
  getLeaveInfoForManager,
  getLeaveInfoByEmployeeId,
  updateLeaveInfo,
  deleteLeaveInfo,
  getAllLeaveBalances,
  updateLeaveBalances,
  getAllLeaveBalanceByYear,
  getAllLeaveBalancesByYearForAllEmployees,
  transferAvailableCredits,
} from "../controllers/leaveController";

import authAdminProtect from "../middleware/adminMiddleware/authAdminMiddleware";
import checkHrStaffRole from "../middleware/adminMiddleware/authHrstaffMiddleware";
import checkHrManagerRole from "../middleware/adminMiddleware/authHrmanagerMiddleware";
import checkManagerOrDepartmentHeadWithControl from "../middleware/managerMiddleware/authHeadManager";
import authDepartmentUserProtect from "../middleware/managerMiddleware/authMangers";
import leaveControl from "../middleware/managerMiddleware/authleave";
import checkDepartmentHeadRoleWithControl from "../middleware/managerMiddleware/authDeptHead";

const router: Router = express.Router();

// Create leave information
router.post("/", createLeaveInfo);

// Get all leave information
router.get("/", authAdminProtect, checkHrStaffRole, getAllLeaveInfo);

router.get("/leaveBalances", getAllLeaveBalances);

// filter the employees for the department head
router.get(
  "/departmentHead/:departmentHeadId",
  authDepartmentUserProtect,
  getLeaveInfoForDepartmentHead
);

// filter the employees for the manager
router.get(
  "/manager/:managerId",
  authDepartmentUserProtect,
  getLeaveInfoForManager
);

// router.get("/leaveBalances/transfer", transferAvailableCredits);
router.get("/leaveBalances/:employeeId/:year", getAllLeaveBalanceByYear);

router.get(
  "/leaveBalancesByYear/:year",
  getAllLeaveBalancesByYearForAllEmployees
);

// Get leave information for a specific employee by ID
router.get("/employee/:employeeId", getLeaveInfoByEmployeeId);

// Update leave information by ID
router.put("/", authDepartmentUserProtect, leaveControl, updateLeaveInfo);

router.put(
  "/leaveBalances/:empId",
  authAdminProtect,
  checkHrStaffRole,
  updateLeaveBalances
);

// Delete leave information by ID
router.delete("/:id", authAdminProtect, checkHrManagerRole, deleteLeaveInfo);

export default router;