import mongoose, { Schema, Document } from "mongoose";

export interface LetterDocument extends Document {
  empId?: string;
  fromWhom?: string;
  toWhom?: string;
  documentNumber?: string;
  topic?: string;
  center?: string;
  date?: Date;
  direction?: "in" | "out"; 
  file?: string;
}

const letterSchema = new Schema<LetterDocument>(
  {
    empId: { type: String },
    fromWhom: { type: String },
    toWhom: { type: String },
    documentNumber: { type: String },
    topic: { type: String },
    center: { type: String },
    date: { type: Date },
    direction: {
      type: String,
      enum: ["in", "out"], 
      required: true, 
    },
    file: { type: String },
  },
  { timestamps: true }
);

letterSchema.pre<LetterDocument>("save", async function (next) {
  if (!this.documentNumber) {
    const lastLetter = await LetterDoc.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastDocumentNumber = 0;
    if (lastLetter && lastLetter.documentNumber) {
      lastDocumentNumber = parseInt(lastLetter.documentNumber.split("-")[1]);
    }
    this.documentNumber = `DOC-${(lastDocumentNumber + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

const LetterDoc = mongoose.model<LetterDocument>(
  "LetterDocument",
  letterSchema
);

export default LetterDoc;
