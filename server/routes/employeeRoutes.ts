import express, { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmpById,
  updateEmployee,
  deleteEmployee,
  createEvaluation,
  getEvaluationByEmployeeId,
  changePasswordController,
  loginController,
  getAllEmployeesForDepartmentHead,
  getAllEmployeesForManager,
  forgotPasswordRequest,
  passwordResetApprove,
  resetPassword,
  deactivateEmployee,

} from "../controllers/employeeController";
import enforcePasswordChange from "../middleware/enforcePasswordChange";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrStaffRole from '../middleware/adminMiddleware/authHrstaffMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';
import checkManagerOrDepartmentHeadWithControl from '../middleware/managerMiddleware/authHeadManager';
import authDepartmentUserProtect from "../middleware/managerMiddleware/authMangers";
import upload from "../config/multerConfig";

const router: Router = express.Router();

// Create an employee registration
router.post("/", authAdminProtect,checkHrStaffRole, upload, createEmployee);

// Employee login
router.post("/login", enforcePasswordChange, loginController);

// Employee password change
router.post("/change-password", changePasswordController);

router.post("/request-reset", forgotPasswordRequest);

router.post("/reset-approve",authAdminProtect,checkHrStaffRole, passwordResetApprove);

router.post("/reset-password", resetPassword);

// Get all employees
router.get("/", authAdminProtect, getAllEmployees);
// Get employee for department head
router.get('/departmentHead/:departmentHeadId', authDepartmentUserProtect, getAllEmployeesForDepartmentHead)

// Get employee for manager
router.get('/manager/:managerId', authDepartmentUserProtect, getAllEmployeesForManager)

// Get a specific employee by ID
router.get("/:id", getEmployeeById);

router.get("/employee/:id", getEmpById);
// Update an employee by ID
router.put("/:id", authAdminProtect, checkHrStaffRole, updateEmployee);

// Delete an employee by ID
router.delete("/:id", authAdminProtect, checkHrStaffRole, deleteEmployee);

// Create an employee evaluations
// this is the updated one for the role based to send the id in the params
router.post("/evaluation/:id", authDepartmentUserProtect, checkManagerOrDepartmentHeadWithControl, createEvaluation);

// Get a specific evaluation by employee ID
router.get("/evaluation/:id", getEvaluationByEmployeeId);

// deactivate an employee by ID
// router.put("/deactivate/:employeeId", authAdminProtect, checkHrManagerRole, deactivateEmployee);
router.put("/deactivate/:id", authAdminProtect, checkHrManagerRole, deactivateEmployee);


export default router;
