import mongoose, { Schema, Document } from "mongoose";

export interface SalaryRaiseDocument extends Document {
  employeeId?: string;
  title?: string;
  currentSalary?: number;
  newSalary?: number;
  salaryRaiseTime?: Date;
  status?: string;
}

const salaryRaiseSchema = new Schema<SalaryRaiseDocument>(
  {
    employeeId: { type: String },
    title: { type: String },
    currentSalary: { type: Number },
    newSalary: { type: Number },
    salaryRaiseTime: { type: Date },
    status: { type: String },
  },
  { timestamps: true }
);

const SalaryRaise = mongoose.model<SalaryRaiseDocument>(
  "SalaryRaise",
  salaryRaiseSchema
);

export default SalaryRaise;
