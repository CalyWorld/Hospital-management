import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import Cookies from "js-cookie";
const router = express.Router();
const asyncHandler = require("express-async-handler");

//get admin user
router.get(
  "/api/admin",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const username = req.user;
      Cookies.set("adminUser", JSON.stringify(username), { expires: 29 });
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
    try {
      const doctors = await Doctor.find().exec();
      res.status(200).json(doctors);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/patient",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const patient = await Patient.find().exec();
        console.log(patient);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

module.exports = router;
