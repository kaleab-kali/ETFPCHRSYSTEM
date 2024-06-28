import express, { Router } from "express";
import { createAdmin, loginHRStaff, changePassword, createHRStaff, updateHRStaff, getStaff, getAllHRStaff } from "../controllers/hrstaffController";
import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkRole from '../middleware/adminMiddleware/authRoleMiddleware';
import upload from '../config/multerConfig';
import checkAdminRole from '../middleware/adminMiddleware/authAdminControl'
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware'
const router: Router = express.Router();

// Create an employee registration
router.post("/Admin", upload, createAdmin);

// create hrstaff
router.post('/create-hrstaff', authAdminProtect, checkRole, upload, createHRStaff);

// Create an employee registration
router.post("/login", loginHRStaff);

// Create an employee registration
router.post("/change-password", authAdminProtect, changePassword);

// update hr staff information
router.put('/update-hrstaff/:id', authAdminProtect, checkAdminRole, upload, updateHRStaff);

// get all hr staff members
router.get('/', authAdminProtect, checkAdminRole, getAllHRStaff)

// get staff information
router.get('/staff', authAdminProtect, checkHrManagerRole, getStaff)

export default router;