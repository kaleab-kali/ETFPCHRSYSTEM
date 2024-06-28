import mongoose, { Schema, Document } from "mongoose";

export interface ComplaintDocument extends Document {
    employeeId?: string;
    category?: string;
    complaint?: string;
    description?: string;
    complaintId?: string;
    status?: string;
}
  
const complaintSchema = new Schema<ComplaintDocument>(
    {
      employeeId: { type: String },
      category: { type: String },
      complaint: { type: String },
      description: { type: String },
      complaintId: { type: String },
      status: {type: String},
    },
    { timestamps: true }
);

complaintSchema.pre<ComplaintDocument>("save", async function (next) {
  if (!this.complaintId) {
    const lastComplaint = await Complaint.findOne({}, {}, { sort: { createdAt: -1 } });
    let lastcomplaintIdNumber = 0;
    if (lastComplaint && lastComplaint.complaintId) {
      lastcomplaintIdNumber = parseInt(lastComplaint.complaintId.split("-")[1]);
    }
    this.complaintId = `Compliant-${(lastcomplaintIdNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Complaint = mongoose.model<ComplaintDocument>(
    "Complaint",
    complaintSchema
);

export default Complaint;
