import express, { Express } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import mongoose from "mongoose";
import { seedDatabase } from "./seedDatabase";
const passport = require("./middleware/passportConfig");
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");

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
  // console.log("connecting to database");
  // seedDatabase();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(adminRoutes);

app.use(logger("dev"));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
