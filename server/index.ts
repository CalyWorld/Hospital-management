import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "morgan";
import mongoose from "mongoose";
const authRoutes = require("./routes/auth");

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(logger("dev"));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
