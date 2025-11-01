
/**
 * Simple seed script to insert sample data into MongoDB.
 * Usage:
 * 1. Set MONGO_URI in .env (or default localhost will be used)
 * 2. node seed.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import DistrictData from "./models/districtModel.js";
import fs from "fs";

dotenv.config();
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/mgnrega_sample";
const sampleFile = "./sample_data/up_sample.json";

mongoose.connect(MONGO).then(async ()=>{
  console.log("Connected to MongoDB for seeding");
  const raw = fs.readFileSync(sampleFile);
  const records = JSON.parse(raw);
  // Clear small sample for demo
  await DistrictData.deleteMany({});
  await DistrictData.insertMany(records);
  console.log("Seeded", records.length, "records");
  process.exit(0);
}).catch(err=>{ console.error("Seed error", err); process.exit(1); });
