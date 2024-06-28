import mongoose, { Schema, Document } from "mongoose";

export interface AppraisalDocument extends Document {
  employeeId?: string;
  fullName?: string;
  currentLevel?: string;
  desiredLevel?: string;
  yearsOfWork?: number;
  positionOfWork?: string;
  previousPromotionDate?: Date;
}

const appraisalSchema = new Schema<AppraisalDocument>(
  {
    employeeId: { type: String },
    fullName: { type: String },
    currentLevel: { type: String },
    desiredLevel: { type: String },
    yearsOfWork: { type: Number },
    positionOfWork: { type: String },
    previousPromotionDate: { type: Date },
  },
  { timestamps: true }
);

const Appraisal = mongoose.model<AppraisalDocument>(
  "Appraisal",
  appraisalSchema
);

export default Appraisal;
