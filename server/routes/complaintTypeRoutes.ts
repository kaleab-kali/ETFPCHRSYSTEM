import { Router } from "express";
import {
    createComplaintType,
    getComplaintTypes,
    updateComplaintType
} from "../controllers/complaintTypeController";

const router = Router();

router.post("/", createComplaintType);

router.get("/", getComplaintTypes);

router.put("/:id", updateComplaintType);

export default router;
