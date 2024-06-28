import mongoose from "mongoose";
import colors from "colors";

const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected successfully on: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.log(`Error: ${"error".yellow}${error}`);
    process.exit(1);
  }
};

export default connectDb;