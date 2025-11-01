
import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  state_name: String,
  district_name: String,
  month: String, // e.g., 2025-01 or "Jan 2025"
  households_worked: Number,
  persons_worked: Number,
  total_expenditure: Number,
  raw: mongoose.Schema.Types.Mixed
});

export default mongoose.model("DistrictData", districtSchema);
