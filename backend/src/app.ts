import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app