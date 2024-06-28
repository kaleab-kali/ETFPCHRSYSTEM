import { Request, Response } from "express";
import Complaint, { ComplaintDocument } from "../models/complaintModel";
import Employee, { EmployeeDocument } from "../models/employeeModel";
import NotificationService from '../services/notificationService';
import { getManagerIds } from '../services/employeeManagerService';
const createComplaint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, category, complaint, description, complaintId } = req.body;
    let status: string;

    // Check the severity of the complaint and set the status
    if (HIGH_SEVERITY_COMPLAINTS.includes(complaint)) {
      status = "High";
    } else if (MEDIUM_SEVERITY_COMPLAINTS.includes(complaint)) {
      status = "Medium";
    } else {
      status = "Low";
    }

    const newComplaint: ComplaintDocument = new Complaint({
      employeeId,
      category,
      complaint,
      description,
      complaintId,
      status,
    });
    await newComplaint.save();

    // Update the Employee schema with the new complaint
    const employee = await Employee.findOne({ empId: employeeId });
    if (employee) {
      if (!employee.complaints) {
        employee.complaints = [];
      }
      employee.complaints.push(newComplaint);
      await employee.save();

      // Notify the manager about the new complaint
      if (employee.manager) {
        const managerId = employee.manager
        const manager = await getManagerIds(managerId);
        const employeeName = `${employee.firstName} ${employee.lastName}`;
        const notificationTitle = 'New Complaint Submitted';
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

// Define the arrays for high, medium, and low severity complaints
const HIGH_SEVERITY_COMPLAINTS = [
  "Use of Excessive Force",
  "Harassment",
  "Discrimination",
  "Abuse of Authority",
  "Intoxication on Duty",
  "Violation of Civil Rights",
  "Violation of Service Members' Rights",
  "Illegal Search and Seizure",
  "Improper Detainment",
  "Corruption",
  "Bribery",
];

const MEDIUM_SEVERITY_COMPLAINTS = [
  "Inappropriate Behavior (including fraternization)",
  "Lack of Respect",
  "Negligence or Failure to Act",
  "Inefficiency",
  "Lack of Effectiveness",
  "Failure to Respond to Emergencies",
  "Improper Securing of Areas",
  "Inadequate Investigations",
  "Violation of SOPs (Standard Operating Procedures)",
  "Failure to Follow Protocol",
  "Breach of Regulations",
  "Poor Communication",
  "Lack of Professionalism",
  "Inappropriate Language or Conduct",
  "Misuse of Equipment",
  "Dishonesty",
  "Personal Bias",
  "Favoritism",
  "Conflict of Interest",
];

const LOW_SEVERITY_COMPLAINTS = [
  "Lack of Knowledge",
  "Poor Skills Demonstration",
];

const getAllComplaints = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaints: ComplaintDocument[] = await Complaint.find();
    
    // Fetch employee information for each complaint
    const complaintsWithEmployeeInfo = await Promise.all(
      complaints.map(async (complaint) => {
        const employee = await Employee.findOne({ empId: complaint.employeeId });
        if (employee) {
          return {
            ...complaint.toObject(),
            employee: {
              fullName: `${employee.firstName} ${employee.lastName}`,
              position: employee.position,
              // Add other employee fields as needed
            },
          };
        } else {
          console.error(`Employee not found for complaint with ID ${complaint._id}`);
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


const getComplaintByEmployeeId = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaint: ComplaintDocument[] | null = await Complaint.find({employeeId: req.params.id});
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
    const complaint: ComplaintDocument | null = await Complaint.findOne({ complaintId: req.params.id });
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
  //updateComplaint,
  //deleteComplaint,
};
