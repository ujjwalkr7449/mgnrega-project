
# MGNREGA District Performance — Sample Project
This is a ready-to-run sample web app for the "Our Voice, Our Rights" take-home project.
It includes:
- Backend (Node.js + Express) with routes to fetch district data (uses MongoDB)
- Frontend (static HTML + Tailwind + Chart.js)
- Sample data for Uttar Pradesh (small dataset)
- Seed script to load sample data into MongoDB

## Quick setup (local)
1. Install Node.js (v16+), npm.
2. Create a free MongoDB Atlas cluster and get the connection string.
3. Rename `.env.example` to `.env` and set `MONGO_URI` and `PORT`.
4. Install backend deps and run:
   ```
   cd backend
   npm install
   node seed.js    # seeds sample data into MongoDB (requires MONGO_URI in .env)
   node server.js
   ```
5. Open `frontend/index.html` directly in a browser (or host static files).
   Update `FRONTEND_API_BASE` in `frontend/script.js` to point to your backend URL if hosting separately.

## Deploying
- Backend: Render / Railway / DigitalOcean / EC2 — set environment variable MONGO_URI
- Frontend: Render static site or GitHub Pages (if using CORS, ensure backend allows it)

## Loom video
Record a short (<2 min) walkthrough:
- Show the hosted site (or run locally)
- Open backend `server.js` and `routes/dataRoutes.js`
- Show the `sample_data/up_sample.json` and `seed.js`
- Explain decisions: backup DB, simple UI for low literacy, GPS detection option

