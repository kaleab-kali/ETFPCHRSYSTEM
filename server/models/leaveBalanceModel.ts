import mongoose, { Schema, Document, Model } from "mongoose";

export interface LeaveBalance extends Document {
  leaveType: string;
  credit: number;
  used: number;
  available: number;
}

const LeaveBalanceSchema: Schema = new Schema({
  leaveType: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
});

const LeaveBalanceModel: Model<LeaveBalance> = mongoose.model<LeaveBalance>(
  "LeaveBalance",
  LeaveBalanceSchema
);

export default LeaveBalanceModel;
