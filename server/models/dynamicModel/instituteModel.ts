import mongoose, { Schema, Document } from "mongoose";

export interface InstituteInfo extends Document {
  instituteId?: string;
  instituteName?: string;
  location?: string;
}

const instituteInfoSchema = new Schema<InstituteInfo>(
  {
    instituteId: { type: String },
    instituteName: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);
instituteInfoSchema.pre<InstituteInfo>("save", async function (next) {
  if (!this.instituteId) {
    const lastTitle = await InstituteModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastTitleNumber = 0;
    if (lastTitle && lastTitle.instituteId) {
      lastTitleNumber = parseInt(lastTitle.instituteId.split("-")[1]);
    }
    this.instituteId = `INS-${(lastTitleNumber + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});
const InstituteModel = mongoose.model<InstituteInfo>(
  "EducationalInstitute",
  instituteInfoSchema
);

export default InstituteModel;