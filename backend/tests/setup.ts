import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

dotenv.config();

beforeAll(async () => {
  await connectDB();
},15000);

afterAll(async () => {
  await mongoose.connection.close();
},15000);