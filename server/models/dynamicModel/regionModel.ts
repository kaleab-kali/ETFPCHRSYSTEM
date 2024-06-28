import mongoose, { Schema, Document } from "mongoose";

export interface RegionInfo extends Document {
  regionId?: string;
  subCity?: string;
  cubCityAbb?: string;
  woreda?: string;
  woredaAbb?: string;
}

const regionInfoSchema = new Schema<RegionInfo>(
  {
    regionId: { type: String },
    subCity: { type: String },
    cubCityAbb: { type: String },
    woreda: { type: String },
    woredaAbb: { type: String },
  },
  { timestamps: true }
);
regionInfoSchema.pre<RegionInfo>("save", async function (next) {
  if (!this.regionId) {
    const lastTitle = await RegionModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastTitleNumber = 0;
    if (lastTitle && lastTitle.regionId) {
      lastTitleNumber = parseInt(lastTitle.regionId.split("-")[1]);
    }
    this.regionId = `R-${(lastTitleNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});
const RegionModel = mongoose.model<RegionInfo>("Regions", regionInfoSchema);

export default RegionModel;