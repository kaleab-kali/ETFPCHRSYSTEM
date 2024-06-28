// routes/holidayRoutes.js

import express from "express";
import { getHolidays, addHoliday } from "../controllers/holidayController";

import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
import checkAdminRole from "../middleware/adminMiddleware/authAdminControl";

const router = express.Router();

router.get("/", getHolidays);
router.post("/", authAdminProtect, checkAdminRole, addHoliday);

export default router;
