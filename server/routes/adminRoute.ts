import express, { NextFunction, Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
const router = express.Router();
const asyncHandler = require("express-async-handler");

//get admin user
router.get(
  "/api/admin",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const username = req.user;
      try {
        res.json(username);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

router.get(
  "/api/admin/doctor",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const doctor = await Doctor.find({}, "username");
        console.log(doctor);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

router.get(
  "/api/admin/patient",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const patient = await Patient.find({}, "username");
        console.log(patient);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

module.exports = router;
