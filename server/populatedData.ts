const mongoose = require("mongoose");
const { Schema, Model } = mongoose;
import { Admin, IAdmin } from "./models/admin";
import { Doctor, IDoctor } from "./models/doctor";
import { Patient, IPatient } from "./models/patient";
import { Message, IMessage } from "./models/messages";
import { HealthRecords, IRecord } from "./models/records";
import { Medication, IMedications } from "./models/medication";
import { Treatment, ITreatment } from "./models/treatment";
import { Appointment, IAppointment } from "./models/appointments";

// Create a unified class to handle all entities
class DatabaseManager {
  constructor() {
    mongoose.set("strictQuery", false);
  }

  async connect() {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/your-database-name",
    );
    console.log("Connected to MongoDB");
  }

  async disconnect() {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }

  async createAdmin(username: string, password: string): Promise<IAdmin> {
    const adminData: IAdmin = {
      username,
      password,
      doctors: [],
      patients: [],
    };
    const admin = new Admin(adminData);
    await admin.save();
    return admin;
  }

  async createDoctor(username: string, password: string): Promise<IDoctor> {
    const doctorData: IDoctor = {
      username,
      password,
      patients: [],
      messages: [],
      appointments: [],
    };
    const doctor = new Doctor(doctorData);
    await doctor.save();
    return doctor;
  }

  async createPatient(username: string, password: string): Promise<IPatient> {
    const patientData: IPatient = {
      username,
      password,
      healthRecords: [], // Set it to undefined initially, it will be updated later
      messages: [],
      appointments: [],
    };

    const patient = new Patient(patientData);
    await patient.save();

    // After creating the patient, update the healthRecords field
    const healthRecordsData: IRecord = {
      treatments: [],
    };

    const healthRecords = new HealthRecords(healthRecordsData);
    await healthRecords.save();

    // patient.healthRecords = healthRecords._id;
    await patient.save();

    return patient;
  }

  async createAppointment(
    patientId: Schema.Types.ObjectId,
    doctorId: Schema.Types.ObjectId,
    date: Date,
  ): Promise<IAppointment> {
    const appointmentData: IAppointment = {
      patient: patientId,
      doctor: doctorId,
      date,
      status: "Scheduled",
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();
    return appointment;
  }

  async createHealthRecords(): Promise<IRecord> {
    const healthRecordData: IRecord = {
      treatments: [],
    };

    const healthRecords = new HealthRecords(healthRecordData);
    await healthRecords.save();
    return healthRecords;
  }

  async createTreatment(
    name: string,
    date: Date,
    totalFee: number,
    doctorId: Schema.Types.ObjectId,
  ): Promise<ITreatment> {
    const treatmentData: ITreatment = {
      name,
      date,
      totalFee,
      doctor: doctorId,
      medication: [],
    };

    const treatment = new Treatment(treatmentData);
    await treatment.save();
    return treatment;
  }

  async createMedication(
    name: string,
    quantity: number,
    fee: number,
  ): Promise<IMedications> {
    const medicationData: IMedications = {
      name,
      quantity,
      fee,
    };
    const medication = new Medication(medicationData);
    await medication.save();
    return medication;
  }

  async createMessage(
    senderId: Schema.Types.ObjectId,
    recipientId: Schema.Types.ObjectId,
    onModel: "Doctor" | "Patient",
    content: string,
  ): Promise<IMessage> {
    const messageData: IMessage = {
      sender: senderId,
      recipient: recipientId,
      onModel,
      content,
      dateSent: new Date(),
    };
    const message = new Message(messageData);
    await message.save();
    return message;
  }
}

// Example usage
const dbManager = new DatabaseManager();

// Make sure to call connect before performing any database operations
dbManager.connect();

// Example: Create admin
async function login() {
  const admin = await dbManager.createAdmin("admin1", "adminpass");
  console.log("Admin created:", admin);

  // Example: Create doctor
  const doctor = await dbManager.createDoctor("doctor1", "doctorpass");
  console.log("Doctor created:", doctor);

  // Example: Create patient
  const patient = await dbManager.createPatient("patient1", "patientpass");
  console.log("Patient created:", patient);
}

login();

// Finally, disconnect when done
dbManager.disconnect();
