import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const URL = process.env.MONGODB_URI;
    const projectName = "resume-builder"
    const conn = await mongoose.connect(`${URL} / ${projectName}`); 
    
    console.log(`MongoDb database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in connecting Database:", error.message);
    process.exit(1); 
  }
};

export default connectDb;