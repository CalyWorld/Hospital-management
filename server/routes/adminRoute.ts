import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import { Appointment } from "../models/appointments";
import { Treatment } from "../models/treatment";
import { HealthRecords } from "../models/records";
import { Medication } from "../models/medication";
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get(
  "/api/admin",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const username = req.user;
        res.status(200).json(username);
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
  "/api/admin/patient/appointments/:patientId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const appointments = await Appointment.find({
        patient: req.params.patientId,
      })
        .populate("doctor")
        .exec();
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/doctor/treatments/:doctorId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const treatment = await Treatment.find({
        doctor: req.params.doctorId,
      })
        .populate("doctor")
        .exec();
      res.status(200).json(treatment);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/patient/records/:patientId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const records = await HealthRecords.find({
        patient: req.params.patientId,
      })
        .populate("treatments")
        .exec();
      res.status(200).json(records);
    } catch (err) {
      console.log(err);
    }
  }),
);

router.get(
  "/api/admin/patient/medications/:medicationId",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      console.log(req.params.medicationId);
      const patientMedication = await Treatment.find({
        medication: { $in: [req.params.medicationId] },
      })
        .populate("medication")
        .exec();
      console.log(patientMedication);
      // res.status(200).json(patientMedication);
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
