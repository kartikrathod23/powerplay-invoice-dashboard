import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  if(mongoose.connection.readyState === 1){
    return;
  }

  try{
    await mongoose.connect(process.env.MONGODB_URI as string);
    if(process.env.NODE_ENV !== "test"){
      console.log("MongoDB Connected");
    }
  }
  catch(error){
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};