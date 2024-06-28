import express from "express";
import {
  getAllAttendances,
  getMonthAttendanceData,
  getPendingReviewAttendances,
  recentAttendances,
  recordAttendance,
  recordCheckout,
  reviewEvidence,
  submitEvidence,
  getAttendancesForDepartmentHead,
  getAttendancesForManager,
  getPendingReviewAttendancesForManager,
  getPendingReviewAttendancesForDepartmentHead,
} from "../controllers/attendanceController";
import multer from "multer";
import checkManagerOrDepartmentHeadWithControl from "../middleware/managerMiddleware/authHeadManager";
import authDepartmentUserProtect from "../middleware/managerMiddleware/authMangers";
import authAdminProtect from "../middleware/adminMiddleware/authAdminMiddleware";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// // Get all attendance
router.get("/", authAdminProtect, getAllAttendances);

// get attendance for department head
router.get(
  "/departmentHead/:departmentHeadId",
  authDepartmentUserProtect,
  getAttendancesForDepartmentHead
);

// get attendance for manager
router.get(
  "/manager/:managerId",
  authDepartmentUserProtect,
  getAttendancesForManager
);

router.get("/recent-activities", recentAttendances);
router.get("/month", getMonthAttendanceData);
router.get("/pending-review", getPendingReviewAttendances);

// get pending-review for department head
router.get(
  "/pending-review/departmentHead/:departmentHeadId",
  authDepartmentUserProtect,
  getPendingReviewAttendancesForDepartmentHead
);

//get pending-review for manager
router.get(
  "/pending-review/manager/:managerId",
  authDepartmentUserProtect,
  getPendingReviewAttendancesForManager
);

// create new attendance
router.post("/checkIn", recordAttendance);

// Check out attendance
router.post("/checkOut", recordCheckout);

// router.post("/submit-evidence", submitEvidence);
router.post("/submit-evidence", upload.single("file"), submitEvidence);
router.put(
  "/review-evidence",
  authDepartmentUserProtect,
  checkManagerOrDepartmentHeadWithControl,
  reviewEvidence
);

export default router;
