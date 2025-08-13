import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgCyan.black);
  } catch (error) {
    console.error(`Error in MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
