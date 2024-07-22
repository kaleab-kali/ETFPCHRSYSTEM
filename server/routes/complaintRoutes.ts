import express, { Router } from "express";
import {
  createComplaint,
  finalizeComplaint,
  getAllComplaints,
  getComplaintByEmployeeId,
  getComplaintById,
  submitEvidence,
  transferComplaint,
  validateComplaint,
//   updateComplaint,
//   deleteComplaint,
} from "../controllers/complaintController";
import authDepartmentUserProtect from "../middleware/managerMiddleware/authMangers";
import checkManagerOrDepartmentHeadWithControl from "../middleware/managerMiddleware/authHeadManager";
import authAdminProtect from "../middleware/adminMiddleware/authAdminMiddleware";
import checkCommitteeRole from "../middleware/adminMiddleware/authCommittee";

const router: Router = express.Router();

// Create a new complaint
router.post("/", createComplaint);

// Get all complaints
// router.get("/", authAdminProtect, getAllComplaints);
router.get("/", getAllComplaints);


// Get a complaint by Employee ID
// router.get("/employee/:id",authAdminProtect, getComplaintByEmployeeId);
router.get("/employee/:id", getComplaintByEmployeeId);


// Get a complaint by ID
router.get("/:id", authAdminProtect, getComplaintById);

// Send complaint to the comittee
router.put("/transfer", transferComplaint);

// validate the complaint
router.put("/validate", authAdminProtect, checkCommitteeRole, validateComplaint);

// eveidence submission
router.post("/evidence", submitEvidence);

router.put("/finalize", authAdminProtect, checkCommitteeRole, finalizeComplaint);

// Update a complaint by ID
//router.put("/:id", updateComplaint);

// Delete a complaint by ID
//router.delete("/:id", deleteComplaint);

export default router;

