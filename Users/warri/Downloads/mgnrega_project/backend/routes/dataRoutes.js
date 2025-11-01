
import express from "express";
import axios from "axios";
import DistrictData from "../models/districtModel.js";

const router = express.Router();

// Simple route: try DB, if empty try to fetch (placeholder) and return.
router.get("/district/:name", async (req, res) => {
  const districtName = req.params.name;
  try {
    // 1. Try DB
    const local = await DistrictData.find({ district_name: new RegExp('^'+districtName+'$', 'i') }).sort({month: -1}).limit(24);
    if(local && local.length>0) return res.json(local);

    // 2. Fallback: try data.gov.in API (example - user must replace resource id & api-key if needed)
    // NOTE: You MUST replace RESOURCE_ID and API_KEY below for real API access.
    const RESOURCE_ID = "REPLACE_WITH_RESOURCE_ID";
    const API_KEY = "REPLACE_WITH_YOUR_API_KEY";
    const apiUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[district_name]=${encodeURIComponent(districtName)}&limit=50`;

    try {
      const r = await axios.get(apiUrl, { timeout: 8000 });
      const records = r.data.records || [];
      if(records.length>0) {
        // map to our model shape and save
        const toSave = records.map(rec=>({
          state_name: rec.state_name || rec.state || "",
          district_name: rec.district_name || rec.district || districtName,
          month: rec.month || rec["month-year"] || "",
          households_worked: Number(rec.households_worked || rec.households || 0),
          persons_worked: Number(rec.persons_worked || rec.persons || 0),
          total_expenditure: Number(rec.total_expenditure || rec.expenditure || 0),
          raw: rec
        }));
        await DistrictData.insertMany(toSave).catch(()=>{});
        return res.json(toSave);
      }
    } catch(e) {
      console.warn("API fetch failed:", e.message);
    }

    // 3. If nothing, return empty array
    res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Server error"});
  }
});

export default router;
