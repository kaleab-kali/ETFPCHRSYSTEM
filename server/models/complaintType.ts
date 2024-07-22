import mongoose, { Schema, Document } from "mongoose";

export interface ComplaintTypeDocument extends Document {
    name: string;
    type: "High" | "Low";
    category: string;
}

const complaintTypeSchema = new Schema<ComplaintTypeDocument>(
    {
        name: { type: String, required: true },
        type: { type: String, enum: ["High", "Low"], required: true },
        category: {type: String},
    },
    { timestamps: true }
);

const ComplaintType = mongoose.model<ComplaintTypeDocument>(
    "ComplaintType",
    complaintTypeSchema
);

export default ComplaintType;