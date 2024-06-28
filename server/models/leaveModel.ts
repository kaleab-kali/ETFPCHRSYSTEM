
import mongoose, { Types, Schema, Document } from "mongoose";

export interface LeaveInfo extends Document {
  employeeId?: string;
  leaveId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  dayType?: string | undefined;
  days?: number | undefined;
  status?: string | undefined;
  delegatedTo?: string | undefined;
  reason?: string | undefined;
  rejectReason?: string | undefined;

}
const leaveInfoSchema = new Schema<LeaveInfo>(
  {
    employeeId: { type: String },
    leaveId: { type: String },
    from: { type: Date },
    to: { type: Date },
    leaveType: { type: String },
    dayType: { type: String },
    days: { type: Number },
    status: { type: String },
    delegatedTo: { type: String },
    reason: { type: String },
    rejectReason: { type: String },
  
  },
  { timestamps: true }
);

leaveInfoSchema.pre<LeaveInfo>("save", async function (next) {
  if (!this.leaveId) {
    const lastLeave = await LeaveInfoModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastLeaveIdNumber = 0;
    if (lastLeave && lastLeave.leaveId) {
      lastLeaveIdNumber = parseInt(lastLeave.leaveId.split("-")[1]);
    }
    this.leaveId = `FPCL-${(lastLeaveIdNumber + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

leaveInfoSchema.pre<LeaveInfo>("save", async function (next) {
  if (!this.leaveId) {
    const lastLeave = await LeaveInfoModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastLeaveIdNumber = 0;
    if (lastLeave && lastLeave.leaveId) {
      lastLeaveIdNumber = parseInt(lastLeave.leaveId.split("-")[1]);
    }
    this.leaveId = `FPCL-${(lastLeaveIdNumber + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

const LeaveInfoModel = mongoose.model<LeaveInfo>("LeaveInfo", leaveInfoSchema);

export default LeaveInfoModel;