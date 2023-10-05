import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
  const mongoUrl = process.env.MONGOURL;
  console.log(mongoUrl);
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected at ${mongoUrl}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
