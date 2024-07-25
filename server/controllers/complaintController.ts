import { Request, Response } from "express";
import Complaint, { ComplaintDocument } from "../models/complaintModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import HRStaff from "../models/hrstaffModel";
import ComplaintType from "../models/complaintType";
import NotificationService from "../services/notificationService";
import { getManagerIds } from "../services/employeeManagerService";
import upload from "../config/multerFileConfig";

// const createComplaint = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { employeeId, category, complaint, description, complaintId } = req.body;
//     let status: string;

//     // Check the severity of the complaint and set the status
//     if (HIGH_SEVERITY_COMPLAINTS.includes(complaint)) {
//       status = "High";
//     } else if (MEDIUM_SEVERITY_COMPLAINTS.includes(complaint)) {
//       status = "Medium";
//     } else {
//       status = "Low";
//     }

//     const newComplaint: ComplaintDocument = new Complaint({
//       employeeId,
//       category,
//       complaint,
//       description,
//       complaintId,
//       status,
//     });
//     await newComplaint.save();

//     // Update the Employee schema with the new complaint
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (employee) {
//       if (!employee.complaints) {
//         employee.complaints = [];
//       }
//       employee.complaints.push(newComplaint);
//       await employee.save();

//       // Notify the manager about the new complaint
//       if (employee.manager) {
//         const managerId = employee.manager
//         const manager = await getManagerIds(managerId);
//         const employeeName = `${employee.firstName} ${employee.lastName}`;
//         const notificationTitle = 'New Complaint Submitted';
//         const notificationMessage = `There is a new complaint on Employee ${employeeName}.`;

//         await NotificationService.createNotification(
//           manager._id.toString(),
//           notificationTitle,
//           notificationMessage
//         );
//       }

//     } else {
//       console.error(`Employee not found with ID ${employeeId}`);
//     }

//     res.status(201).json(newComplaint);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Define the arrays for high, medium, and low severity complaints

const createComplaint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, category, complaint, description } = req.body;

    const complaintType = await ComplaintType.findOne({ name: complaint });
    if (!complaintType) {
      res.status(400).json({ error: "Complaint type not found" });
      return;
    }

    let degreeOfComplaint: string;
    if (complaintType.type === "High") {
      degreeOfComplaint = "High";
    } else if (complaintType.type === "Low") {
      degreeOfComplaint = "Low";
    } else {
      res.status(400).json({ error: "Invalid complaint type" });
      return;
    }

    const newComplaint: ComplaintDocument = new Complaint({
      employeeId,
      category,
      complaint,
      description,
      degreeOfComplaint,
      status: "sent",
    });
    await newComplaint.save();

    const employee = await Employee.findOne({ empId: employeeId });
    if (employee) {
      if (!employee.complaints) {
        employee.complaints = [];
      }
      employee.complaints.push(newComplaint);
      await employee.save();

      // Notify the manager about the new complaint
      if (employee.manager) {
        const managerId = employee.manager;
        const manager = await getManagerIds(managerId);
        const employeeName = `${employee.firstName} ${employee.lastName}`;
        const notificationTitle = "New Complaint Submitted";
        const notificationMessage = `There is a new complaint on Employee ${employeeName}.`;

        await NotificationService.createNotification(
          manager._id.toString(),
          notificationTitle,
          notificationMessage
        );
      }
    } else {
      console.error(`Employee not found with ID ${employeeId}`);
    }

    res.status(201).json(newComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const HIGH_SEVERITY_COMPLAINTS = [
//   "Use of Excessive Force",
//   "Harassment",
//   "Discrimination",
//   "Abuse of Authority",
//   "Intoxication on Duty",
//   "Violation of Civil Rights",
//   "Violation of Service Members' Rights",
//   "Illegal Search and Seizure",
//   "Improper Detainment",
//   "Corruption",
//   "Bribery",
// ];

// const MEDIUM_SEVERITY_COMPLAINTS = [
//   "Inappropriate Behavior (including fraternization)",
//   "Lack of Respect",
//   "Negligence or Failure to Act",
//   "Inefficiency",
//   "Lack of Effectiveness",
//   "Failure to Respond to Emergencies",
//   "Improper Securing of Areas",
//   "Inadequate Investigations",
//   "Violation of SOPs (Standard Operating Procedures)",
//   "Failure to Follow Protocol",
//   "Breach of Regulations",
//   "Poor Communication",
//   "Lack of Professionalism",
//   "Inappropriate Language or Conduct",
//   "Misuse of Equipment",
//   "Dishonesty",
//   "Personal Bias",
//   "Favoritism",
//   "Conflict of Interest",
// ];

// const LOW_SEVERITY_COMPLAINTS = [
//   "Lack of Knowledge",
//   "Poor Skills Demonstration",
// ];

const getAllComplaints = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaints: ComplaintDocument[] = await Complaint.find();

    // Fetch employee information for each complaint
    const complaintsWithEmployeeInfo = await Promise.all(
      complaints.map(async (complaint) => {
        const employee = await Employee.findOne({
          empId: complaint.employeeId,
        });
        if (employee) {
          return {
            ...complaint.toObject(),
            employee: {
              fullName: `${employee.firstName} ${employee.lastName}`,
              position: employee.position,
            },
          };
        } else {
          console.error(
            `Employee not found for complaint with ID ${complaint._id}`
          );
          return complaint.toObject();
        }
      })
    );

    res.status(200).json(complaintsWithEmployeeInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getComplaintByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const complaint: ComplaintDocument[] | null = await Complaint.find({
      employeeId: req.params.id,
    });
    if (!complaint) {
      res.status(404).json({ message: "Complaint not found" });
      return;
    }
    res.status(200).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getComplaintById = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaint: ComplaintDocument | null = await Complaint.findOne({
      complaintId: req.params.id,
    });
    if (!complaint) {
      res.status(404).json({ message: "Complaint not found" });
      return;
    }
    res.status(200).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const transferComplaint = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { complaintId } = req.body;

    const complaint = await Complaint.findOne({ complaintId: complaintId });
    if (!complaint) {
      res.status(404).json({ error: "Complaint not found" });
      return;
    }

    if (complaint.status !== "sent") {
      res.status(400).json({ error: "Complaint status is not 'sent'" });
      return;
    }

    complaint.status = "pending";
    await complaint.save();

    // Notify the discipline committee
    const disciplineCommitteeMembers = await HRStaff.find({
      role: "committee",
    });
    const employee = await Employee.findOne({ empId: complaint.employeeId });
    const employeeName = `${employee?.firstName} ${employee?.lastName}`;
    const notificationTitle = "Complaint Transferred to Discipline Committee";
    const notificationMessage = `A complaint regarding Employee ${employeeName} has been transferred to the discipline committee.`;

    for (const member of disciplineCommitteeMembers) {
      await NotificationService.createNotification(
        member._id.toString(),
        notificationTitle,
        notificationMessage
      );
    }

    res
      .status(200)
      .json({
        message: "Complaint status updated and discipline committee notified.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateComplaint = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { complaintId, status } = req.body;

    const complaint = await Complaint.findOne({ complaintId: complaintId });
    if (!complaint) {
      res.status(404).json({ error: "Complaint not found" });
      return;
    }

    if (!["reject", "inprogress"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    complaint.status = status;
    await complaint.save();

    const employee = await Employee.findOne({ empId: complaint.employeeId });
    const employeeName = `${employee?.firstName} ${employee?.lastName}`;

    if (status === "reject") {
      // Notify the manager about the rejected complaint
      const employee = await Employee.findOne({ empId: complaint.employeeId });
      if (!employee) {
        res.status(404).json({ error: "Employee not found" });
        return;
      }

      if (employee.manager) {
        const managerId = employee.manager;
        const manager = await getManagerIds(managerId);
        const employeeName = `${employee.firstName} ${employee.lastName}`;
        const notificationTitle = "Complaint Validation Result";
        const notificationMessage = `The complaint regarding Employee ${employeeName} has been rejected.`;

        await NotificationService.createNotification(
          manager._id.toString(),
          notificationTitle,
          notificationMessage
        );
      }
    } else if (status === "inprogress") {
      // Notify the employee to submit evidence
      const notificationTitle = "There is Complaint on You";
      const notificationMessage = `Complaint has been recorded. Please submit the necessary you have.`;

      if (employee) {
        await NotificationService.createNotification(
          employee._id.toString(),
          notificationTitle,
          notificationMessage
        );
      }
    }

    res.status(200).json({ message: `Complaint status updated to ${status}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const submitEvidence = async (req: Request, res: Response): Promise<void> => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { complaintId } = req.body;
      const file = req.file;

      const complaint = await Complaint.findOne({ complaintId: complaintId });
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      complaint.evidence = file.path;
      await complaint.save();

      // Notify the committee
      const disciplineCommitteeMembers = await HRStaff.find({
        role: "committee",
      });
      const employee = await Employee.findOne({ empId: complaint.employeeId });
      const employeeName = `${employee?.firstName} ${employee?.lastName}`;
      const notificationTitle = "Evidence Submitted";
      const notificationMessage = `Evidence has been submitted for the complaint regarding Employee ${employeeName}.`;

      for (const member of disciplineCommitteeMembers) {
        await NotificationService.createNotification(
          member._id.toString(),
          notificationTitle,
          notificationMessage
        );
      }

      res.status(200).json({ message: "Evidence submitted successfully." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const finalizeComplaint = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { complaintId, status, comment } = req.body;

    if (!["guilt", "not guilt"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const complaint = await Complaint.findOne({ complaintId: complaintId });
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = status;
    complaint.comment = comment;
    await complaint.save();

    const employee = await Employee.findOne({ empId: complaint.employeeId });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.manager) {
      const managerId = employee.manager;
      const manager = await getManagerIds(managerId);
      const employeeName = `${employee.firstName} ${employee.lastName}`;
      const notificationTitle = "Complaint Decision Finalized";
      const notificationMessage = `The complaint regarding Employee ${employeeName} has been finalized with status: ${status}. Comment: ${comment}`;

      await NotificationService.createNotification(
        manager._id.toString(),
        notificationTitle,
        notificationMessage
      );
    }

    return res
      .status(200)
      .json({ message: "Complaint status updated and manager notified." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const updateComplaint = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { employeeId, category, complaint, description } = req.body;
//     const updatedComplaint: ComplaintDocument | null = await Complaint.findOneAndUpdate(
//       { _id: req.params.id },
//       { employeeId, category, complaint, description },
//       { new: true }
//     );
//     if (!updatedComplaint) {
//       res.status(404).json({ error: "Complaint not found" });
//       return;
//     }

//     // Update the corresponding employee's complaints array
//     const employee = await Employee.findOne({ empId: updatedComplaint.employeeId });
//     if (employee) {
//       if (!employee.complaints) {
//         employee.complaints = [];
//       }
//       const index = employee.complaints.findIndex((c) => c.toString() === updatedComplaint._id.toString());
//       if (index !== -1) {
//         employee.complaints.splice(index, 1);
//         await employee.save();
//       }
//     }

//     res.status(200).json(updatedComplaint);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const deleteComplaint = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedComplaint: ComplaintDocument | null = await Complaint.findByIdAndDelete(req.params.id);
//     if (!deletedComplaint) {
//       res.status(404).json({ error: "Complaint not found" });
//       return;
//     }

//     // Update the corresponding employee's complaints array
//     const employee = await Employee.findOne({ empId: deletedComplaint.employeeId });
//     if (employee) {
//       if (!employee.complaints) {
//         employee.complaints = [];
//       }
//       const index = employee.complaints.findIndex((c) => c.toString() === deletedComplaint._id.toString());
//       if (index !== -1) {
//         employee.complaints.splice(index, 1);
//         await employee.save();
//       }
//     }

//     res.status(200).json({ message: "Complaint deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export {
  createComplaint,
  getAllComplaints,
  getComplaintByEmployeeId,
  getComplaintById,
  transferComplaint,
  validateComplaint,
  submitEvidence,
  finalizeComplaint,
  //updateComplaint,
  //deleteComplaint,
};
