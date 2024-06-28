import mongoose, { Schema, Document, model } from "mongoose";

interface DepartmentDocument extends Document {
  departmentName: string;
  departmentHead: string;
  departmentID: string;
  staffNumber: number;
  managers: string[];
}

const departmentSchema = new Schema<DepartmentDocument>(
  {
    departmentName: { type: String, required: true },
    departmentHead: { type: String},
    departmentID: { type: String, unique: true },
    staffNumber: { type: Number },
    managers: [{ type: String }],
  },
  { timestamps: true }
);

departmentSchema.pre<DepartmentDocument>("save", async function (next) {
  if (!this.departmentID) {
    const lastDepartment = await Department.findOne({}, {}, { sort: { createdAt: -1 } });
    const lastDepartmentId = lastDepartment && lastDepartment.departmentID ? parseInt(lastDepartment.departmentID.split("-")[1]) : 0;
    const newDepartmentId = `DPTID-${(lastDepartmentId + 1).toString().padStart(4, "0")}`;
    this.departmentID = newDepartmentId;
  }
  next();
});

const Department = model<DepartmentDocument>("Department", departmentSchema);

export { Department, DepartmentDocument };