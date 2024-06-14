import express, { Request, Response } from "express";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";
import { Appointment } from "../models/appointments";
import { Treatment } from "../models/treatment";
import { HealthRecords } from "../models/records";
import { Medication } from "../models/medication";
class AdminController {
  private static instance: AdminController;
  public static getInstance() {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController();
    }
    return AdminController.instance;
  }
  public async getAdmin(req: Request, res: Response): Promise<void> {
    if (req.isAuthenticated()) {
      try {
        const username = req.user;
        res.status(200).json(username);
      } catch (err) {
        console.log(err);
      }
    }
  }
  public async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await Doctor.find().exec();
      res.status(200).json(doctors);
    } catch (err) {
      console.log(err);
    }
  }
  public async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await Patient.find().exec();
      res.status(200).json(patients);
    } catch (err) {
      console.log(err);
    }
  }
  public async getTotalFees(req: Request, res: Response): Promise<void> {
    try {
      const treatmentFees = await Treatment.find()
        .populate("medication")
        .exec();
      res.status(200).json(treatmentFees);
    } catch (err) {
      console.log(err);
    }
  }
  public async getDoctorAppointments(
    req: Request,
    res: Response,
  ): Promise<void> {
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
  }
  public async getPatientAppointments(
    req: Request,
    res: Response,
  ): Promise<void> {
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
  }
  public async getPatientAppointmentsByDate(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const startOfDay = new Date(req.params.date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(req.params.date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const appointments = await Appointment.find({
        startDate: {
          $gte: startOfDay.toISOString(),
        },
        endDate: {
          $lte: endOfDay.toISOString(),
        },
      })
        .populate("doctor patient")
        .exec();
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
    }
  }
  public async getDoctorTreatments(req: Request, res: Response): Promise<void> {
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
  }
  public async getPatientRecords(req: Request, res: Response): Promise<void> {
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
  }
  public async getPatientMedications(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const patientMedication = await Medication.findById(
        req.params.medicationId,
      ).exec();
      res.status(200).json(patientMedication);
    } catch (err) {
      console.log(err);
    }
  }
  public async getDoctorDetails(req: Request, res: Response): Promise<void> {
    try {
      const doctorById = await Doctor.findById(req.params.doctorId)
        .populate("patient")
        .exec();
      res.status(200).json(doctorById);
    } catch (err) {
      console.log(err);
    }
  }
  public async getPatientDetails(req: Request, res: Response): Promise<void> {
    try {
      const patientById = await Patient.findById(req.params.patientId)
        .populate("doctor")
        .exec();
      res.status(200).json(patientById);
    } catch (err) {
      console.log(err);
    }
  }
  public async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      await Doctor.findByIdAndDelete(req.params.doctorId);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
}

export default AdminController.getInstance();
