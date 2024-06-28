import mongoose, { Schema, Document } from "mongoose";

interface SalaryLimitsDocument extends Document {
  title: string;
  salaryLimit: number;
}

const salaryLimitsSchema = new Schema<SalaryLimitsDocument>(
  {
    title: { type: String, unique: true },
    salaryLimit: { type: Number },
  },
  { timestamps: true }
);

const SalaryLimits = mongoose.model<SalaryLimitsDocument>(
  "SalaryLimits",
  salaryLimitsSchema
);

export  { SalaryLimits, SalaryLimitsDocument };