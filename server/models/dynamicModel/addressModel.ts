import mongoose, { Schema, Document } from "mongoose";

export interface Woreda extends Document {
  woredaName: string;
  woredaAbb: string;
  woredaId?: string;
}

export interface SubCity extends Document {
  subCityName: string;
  subCityAbb: string;
  subId?: string;
  woredas: Woreda[];
}

export interface RegionInfo extends Document {
  regionId?: string;
  regionAbb?: string;
  regionName?: string;
  subCities: SubCity[];
  subCityCounter: number;
}

const woredaSchema = new Schema<Woreda>(
  {
    woredaName: { type: String, required: true },
    woredaAbb: { type: String, required: true },
    woredaId: { type: String },
  },
  { timestamps: true }
);

const subCitySchema = new Schema<SubCity>(
  {
    subCityName: { type: String, required: true },
    subCityAbb: { type: String, required: true },
    subId: { type: String },
    woredas: [woredaSchema],
  },
  { timestamps: true }
);

const addressInfoSchema = new Schema<RegionInfo>(
  {
    regionId: { type: String },
    regionAbb: { type: String },
    regionName: { type: String },
    subCities: [subCitySchema],
    subCityCounter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

addressInfoSchema.pre<RegionInfo>("save", async function (next) {
  if (!this.regionId) {
    const lastTitle = await AddressModel.findOne(
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

subCitySchema.pre<SubCity>("save", async function (next) {
  if (!this.subId) {
    const parentRegion = this.$parent() as RegionInfo;
    if (parentRegion) {
      this.subId = `S-${parentRegion.subCityCounter
        .toString()
        .padStart(4, "0")}`;
      parentRegion.subCityCounter++;
    }
  }
  next();
});

woredaSchema.pre<Woreda>("save", async function (next) {
  if (!this.woredaId) {
    const parentSubCity = this.$parent() as SubCity;
    if (parentSubCity) {
      this.woredaId = `W-${parentSubCity.woredas.length
        .toString()
        .padStart(4, "0")}`;
    }
  }
  next();
});

const AddressModel = mongoose.model<RegionInfo>("Address", addressInfoSchema);

export default AddressModel;