
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mgnrega_sample")
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.error("MongoDB connection error:", err));

app.listen(PORT, ()=>console.log("Server running on port", PORT));
