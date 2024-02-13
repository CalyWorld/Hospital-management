import express, { Express } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import mongoose from "mongoose";
const passport = require("./middleware/passportConfig");
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute");
const patientRoutes = require("./routes/patientRoute");
import bcrypt from "bcryptjs";
import { Doctor } from "./models/doctor";
import { Admin } from "./models/admin";
import { Patient } from "./models/patient";
import { Medication } from "./models/medication";
import { Treatment } from "./models/treatment";
import { HealthRecords } from "./models/records";
import { Message } from "./models/messages";
import { Appointment } from "./models/appointments";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  }),
);

mongoose.set("strictQuery", false);
require("dotenv").config();

const mongoDB: string = process.env.MONGODB_URI ?? "default_uri";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(adminRoutes);
app.use(doctorRoutes);
app.use(patientRoutes);

app.use(logger("dev"));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
