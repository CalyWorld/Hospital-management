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

  //update doctor details
  public async updateDoctorDetails(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, gender, country, age, address } = req.body;
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !country ||
        typeof age !== "number" ||
        !address
      ) {
        res.status(400).json({ message: "Missing required doctor fields" });
        return;
      }

      const updatedDoctor = await this.doctorService.updateDoctorDetails(
        req.params.doctorId,
        { firstName, lastName, gender, country, age, address },
      );
      if (!updatedDoctor) {
        res.status(404).json({ message: "Doctor not found" });
        return;
      }
      res.status(200).json(updatedDoctor);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating doctor details");
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

  //update patient details
  public async updatePatientDetails(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, gender, country, age, address, phoneBook } =
        req.body;
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !country ||
        typeof age !== "number" ||
        !address ||
        typeof phoneBook !== "number"
      ) {
        res.status(400).json({ message: "Missing required patient fields" });
        return;
      }

      const updatedPatient = await this.patientService.updatePatientDetails(
        req.params.patientId,
        { firstName, lastName, gender, country, age, address, phoneBook },
      );
      if (!updatedPatient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
      res.status(200).json(updatedPatient);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating patient details");
    }
  }

  //delete patient
  public async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      await this.patientService.deletePatient(req.params.patientId);
      res.status(200).json({ message: "Patient deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting patient");
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

  //create appointment
  public async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { title, doctorId, patientId, startDate, endDate } = req.body;
      if (!title || !doctorId || !patientId || !startDate || !endDate) {
        res.status(400).json({ message: "Missing required appointment fields" });
        return;
      }

      const appointment = await this.appointmentService.createAppointment({
        title,
        doctorId,
        patientId,
        startDate,
        endDate,
      });
      res.status(201).json(appointment);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating appointment";
      res.status(400).json({ message });
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
