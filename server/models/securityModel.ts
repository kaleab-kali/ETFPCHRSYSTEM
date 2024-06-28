import mongoose, { Document, Schema } from "mongoose";

interface SecurityContext {
  id?: string;
  name?: string;
  email?: string;
  department?: string;
}
const securitySchema = new Schema<SecurityContext>({
  id: { type: String },
  email: { type: String },
  name: { type: String },
  department: { type: String },
});

const SecurityModel = mongoose.model<SecurityContext>(
  "Securities",
  securitySchema
);
export default SecurityModel;
