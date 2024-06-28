import mongoose, { Schema, Document } from "mongoose";

export interface AppraisalHistory extends Document {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string | undefined;
  promotionDate?: Date | undefined;
}

const appraisalHistorySchema = new Schema<AppraisalHistory>(
  {
    employeeId: { type: String, required: true },
    currentLevel: { type: String, required: true },
    nextLevel: { type: String, required: true },
    scores: {
      education: { type: Number, required: true },
      service: { type: Number, required: true },
      attitude: { type: Number, required: true },
      behaviour: { type: Number, required: true },
      workEfficiency: { type: Number, required: true },
      disciplinary: { type: Number, required: true },
    },
    totalScore: { type: Number, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

const AppraisalHistoryModel = mongoose.model<AppraisalHistory>(
  "AppraisalHistory",
  appraisalHistorySchema
);

export default AppraisalHistoryModel;
