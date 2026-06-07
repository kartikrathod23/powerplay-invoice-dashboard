import dotenv from "dotenv";
import mongoose from "mongoose";
import {connectDB} from "../src/config/db";

dotenv.config({
    quiet:true
});

beforeAll(async () => {
  if(mongoose.connection.readyState === 0){
    await connectDB();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});