import { Request, Response } from "express";
import { AdminService } from "../services/adminService";
import { DoctorService } from "../services/doctorService";
import { PatientService } from "../services/patientService";
import { TreatmentService } from "../services/treatmentService";
import { MedicationService } from "../services/medicationService";
import { RecordService } from "../services/recordService";
import { AppointmentService } from "../services/appointmentService";

export class AdminController {
  constructor(
    private adminService: AdminService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private treatmentService: TreatmentService,
    private medicationService: MedicationService,
    private recordService: RecordService,
    private appointmentService: AppointmentService,
  ) {}
  //get admin method in adminController
  public async getAdmin(req: Request, res: Response): Promise<void> {
    if (req.isAuthenticated()) {
      try {
        //calls the action which is service and passes its params into the action
        const adminUser = await this.adminService.getAdmin(req);
        res.status(200).json(adminUser);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching admin");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  }

  //get all doctors method in adminController
  public async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const allDoctors = await this.doctorService.getAllDoctors();
      res.status(200).json(allDoctors);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching all doctors");
    }
  }

  //get doctorDetails method in adminController
  public async getDoctorDetails(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const doctorDetails = await this.doctorService.getDoctorDetails(
        req.params.doctorId,
      );
      res.status(200).json(doctorDetails);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching all doctors");
    }
  }

  //deletes doctor
  public async getDeleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      await this.doctorService.getDeleteDoctor(req.params.doctorId);
      res.status(200);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting specific doctor");
    }
  }
  //get doctor appointments
  public async getDoctorAppointments(
    req: Request,
    res: Response,
  ): Promise<void> {
    //calls the action which is service and passes its params into the action
    try {
      const doctorAppointments =
        await this.appointmentService.getDoctorAppointments(
          req.params.doctorId,
        );
      res.status(200).json(doctorAppointments);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting doctor appointments");
    }
  }

  //get doctor treatments
  public async getDoctorTreatments(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const doctorTreatments = await this.treatmentService.getDoctorTreatments(
        req.params.doctorId,
      );
      res.status(200).json(doctorTreatments);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting doctor treatments");
    }
  }

  //get all patients
  public async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service
      const allPatients = await this.patientService.getAllPatients();
      res.status(200).json(allPatients);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting all patients");
    }
  }

  //get patient detail
  public async getPatientDetails(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const allPatients = await this.patientService.getPatientDetails(
        req.params.patientId,
      );
      res.status(200).json(allPatients);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting all patients");
    }
  }

  //get patient medication
  public async getPatientMedications(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const patientMedication =
        await this.medicationService.getPatientMedications(
          req.params.medicationId,
        );
      res.status(200).json(patientMedication);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting patient medication");
    }
  }

  //get patient records
  public async getPatientRecords(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const patientRecords = await this.recordService.getPatientRecords(
        req.params.patientId,
      );
      res.status(200).json(patientRecords);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting patient records");
    }
  }

  //get patient appointments
  public async getPatientAppointments(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const patientAppointments =
        await this.appointmentService.getPatientAppointments(
          req.params.patientId,
        );
      res.status(200).json(patientAppointments);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting patient appointments");
    }
  }

  //get patient appointments by date
  public async getPatientAppointmentsByDate(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      //calls the action which is service and passes its params into the action
      const patientAppointmentsByDate =
        await this.appointmentService.getPatientAppointmentsByDate(
          req.params.date,
        );
      res.status(200).json(patientAppointmentsByDate);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting patient appointments by date");
    }
  }

  //get total fees for dashboard
  public async getTotalFees(req: Request, res: Response): Promise<void> {
    try {
      //calls the action which is service
      const totalFees = await this.treatmentService.getTotalFees();
      res.status(200).json(totalFees);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting total fees");
    }
  }
}
