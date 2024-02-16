import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import { Admin, IAdmin } from "../models/admin";
import Cookies from "js-cookie";
import { Appointment } from "../models/appointments";
const router = express.Router();
const asyncHandler = require("express-async-handler");

//get admin user
router.get(
  "/api/admin",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const username = req.user;
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
    try {
      const patients = await Patient.find().exec();
      res.status(200).json(patients);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/doctor/appointments/:doctorId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const appointments = await Appointment.find({
        doctor: req.params.doctorId,
      })
        .populate("patient")
        .exec();
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/doctor/:doctorId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const doctorById = await Doctor.findById(req.params.doctorId)
        .populate("patient")
        .exec();
      res.status(200).json(doctorById);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/patient/:patientId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const patientById = await Patient.findById(req.params.patientId)
        .populate("doctor")
        .exec();
      res.status(200).json(patientById);
    } catch (err) {
      console.log(err);
    }
  }),
);

module.exports = router;
