# Hospital Management

Full-stack hospital admin dashboard built with:
- `client`: React + TypeScript + Vite
- `server`: Express + TypeScript + MongoDB (Mongoose)

## What This Project Does

The app is centered around **hospital admin operations**.

### Admin capabilities
- Sign in as hospital admin (`/api/admin/login`)
- View dashboard stats:
  - total doctors
  - total patients
  - available doctors for the selected day
  - appointments for the selected day
- View appointments by date (calendar-driven)
- Manage doctors:
  - open doctor details
  - edit doctor details
  - delete doctor
  - book patient appointment with doctor
- Manage patients:
  - open patient details
  - edit patient details
  - delete patient
- Navigate to Settings outlet and toggle light/dark admin theme
- Open header notification panel to view recent appointment activities
- Logout from sidebar logout icon

## Repository Structure

- `client/` React frontend
- `server/` Express API and Mongo models
- `CLOUDFLARE_DEPLOYMENT.md` frontend deployment notes for Cloudflare Pages

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string (Atlas/local)

## Environment Variables

### Server (`server/.env`)
Required:
- `MONGODB_URI` Mongo connection string
- `JWT_SECRET` secret for JWT signing
- `CLIENT_URI` frontend origin for CORS (example: `http://localhost:5173`)
- `PORT` optional (defaults to `3000`)

### Client (`client/.env`)
Required:
- `VITE_API_BASE_URL` backend URL (example: `http://localhost:3000`)

## Install

### 1) Server
```bash
cd server
npm install
```

### 2) Client
```bash
cd client
npm install
```

## Run Locally

### Start API
```bash
cd server
npm run dev
```

### Start frontend
```bash
cd client
npm run dev
```

## Seed Database

The seeder now creates data in **current month to next month** and includes doctor availability for today/tomorrow/next week.

Run reseed (clears existing collections and inserts fresh data):

```bash
cd server
npx ts-node --transpile-only -e "require('dotenv').config(); const mongoose=require('mongoose'); const { seedDatabase } = require('./seedDatabase.ts'); (async()=>{ await mongoose.connect(process.env.MONGODB_URI); const collections = Object.values(mongoose.connection.collections); for (const collection of collections) { await collection.deleteMany({}); } await seedDatabase(); process.exit(0); })().catch((err)=>{ console.error(err); process.exit(1); });"
```

Seeded admin accounts:
- `admin1 / password1`
- `admin2 / password2`
- `admin3 / password3`
- `admin4 / password4`
- `admin5 / password5`

## Tests

### Client tests
```bash
cd client
npm test
```

### Server tests
```bash
cd server
npm test
```

Note: HTTP tests may be skipped in restricted sandbox environments that block local port binding.

## Build

### Client
```bash
cd client
npm run build
```

### Server
```bash
cd server
npm run build
```

## API Highlights

Admin routes (JWT protected):
- `GET /api/admin/doctor`
- `GET /api/admin/patient`
- `GET /api/admin/doctor/:doctorId`
- `GET /api/admin/patient/:patientId`
- `PATCH /api/admin/doctor/:doctorId`
- `PATCH /api/admin/patient/:patientId`
- `DELETE /api/admin/doctor/:doctorId/delete`
- `DELETE /api/admin/patient/:patientId/delete`
- `POST /api/admin/appointment`
- `GET /api/admin/patients/appointments/:date`

Auth:
- `POST /api/admin/login`

## Deployment

For frontend on Cloudflare Pages, see:
- `CLOUDFLARE_DEPLOYMENT.md`
