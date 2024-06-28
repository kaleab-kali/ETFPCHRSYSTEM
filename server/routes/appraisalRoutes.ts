import express from "express";
import {
  createAppraisal,
  getAllAppraisals,
} from "../controllers/appraisalController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';

const router = express.Router();

// // Get all appraisals
router.get("/all", authAdminProtect, checkHrManagerRole, getAllAppraisals);

// create new appraisal
router.post("/", authAdminProtect, checkHrManagerRole, createAppraisal);

export default router;
