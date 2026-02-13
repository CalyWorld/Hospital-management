const mongoose = require("mongoose");
import { SuperAdmin } from "./models/superAdmin";
import { Admin } from "./models/admin";
import { Hospital } from "./models/hospital";
import { Doctor } from "./models/doctor";
import { Patient } from "./models/patient";
import { Appointment } from "./models/appointments";
import { Medication } from "./models/medication";
import { Message } from "./models/messages";
import { HealthRecord } from "./models/healthRecords";
import { Treatment } from "./models/treatment";
const bcrypt = require("bcrypt");

async function hashPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
export async function seedDatabase() {
  try {
    // SuperAdmin
    const superAdmin = await SuperAdmin.create({
      username: "superadmin1",
      password: await hashPassword("superadminpass"),
      createdAt: new Date(),
    });

    // Hospitals
    const hospitals = await Hospital.insertMany([
      { name: "City Hospital", address: "123 Main St", createdAt: new Date() },
      {
        name: "Greenwood Medical Center",
        address: "456 Elm St",
        createdAt: new Date(),
      },
      {
        name: "Sunnydale Clinic",
        address: "789 Oak St",
        createdAt: new Date(),
      },
      {
        name: "Downtown Health",
        address: "101 Pine St",
        createdAt: new Date(),
      },
      {
        name: "Lakeside Hospital",
        address: "202 Maple St",
        createdAt: new Date(),
      },
    ]);

    // Admins
    const admins = await Admin.insertMany([
      {
        username: "admin1",
        password: await hashPassword("password1"),
        role: "hospital-admin",
        hospital: hospitals[0]._id,
        createdAt: new Date(),
      },
      {
        username: "admin2",
        password: await hashPassword("password2"),
        role: "hospital-admin",
        hospital: hospitals[1]._id,
        createdAt: new Date(),
      },
      {
        username: "admin3",
        password: await hashPassword("password3"),
        role: "hospital-admin",
        hospital: hospitals[2]._id,
        createdAt: new Date(),
      },
      {
        username: "admin4",
        password: await hashPassword("password4"),
        role: "hospital-admin",
        hospital: hospitals[3]._id,
        createdAt: new Date(),
      },
      {
        username: "admin5",
        password: await hashPassword("password5"),
        role: "hospital-admin",
        hospital: hospitals[4]._id,
        createdAt: new Date(),
      },
    ]);

    await SuperAdmin.findByIdAndUpdate(superAdmin._id, {
      admins: admins.map((admin) => admin._id),
    });

    // Sample names
    const doctorFirstNames = ["James", "John", "Robert", "Michael", "William"];
    const doctorLastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];

    const patientFirstNames = [
      "Mary",
      "Patricia",
      "Jennifer",
      "Linda",
      "Elizabeth",
    ];
    const patientLastNames = [
      "Miller",
      "Davis",
      "Garcia",
      "Rodriguez",
      "Martinez",
    ];

    const addresses = [
      "123 Broadway, New York, NY",
      "456 Oak St, San Francisco, CA",
      "789 Pine Ave, Miami, FL",
      "101 Maple Dr, Chicago, IL",
      "202 Elm St, Los Angeles, CA",
      "303 Cedar Ave, Dallas, TX",
      "404 Willow St, Boston, MA",
      "505 Birch Rd, Seattle, WA",
      "606 Ash Ln, Denver, CO",
      "707 Palm Blvd, Houston, TX",
      "808 Fir St, Phoenix, AZ",
      "909 Cedar St, Atlanta, GA",
      "1001 Pine St, Washington, DC",
      "1102 Oak Ave, Detroit, MI",
      "1203 Elm Dr, Orlando, FL",
      "1304 Birch St, Las Vegas, NV",
      "1405 Maple Rd, Portland, OR",
      "1506 Palm St, Austin, TX",
      "1607 Pine Ave, Raleigh, NC",
      "1708 Fir Dr, Charlotte, NC",
      "1809 Cedar Ln, Minneapolis, MN",
      "1901 Oak St, Columbus, OH",
      "2002 Maple St, Kansas City, MO",
      "2103 Pine Ave, Indianapolis, IN",
      "2204 Elm Dr, San Diego, CA",
    ];

    // Doctors and Patients
    const doctorData = [];
    const patientData = [];
    const specialization = [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "General Medicine",
    ];

    for (let i = 0; i < hospitals.length; i++) {
      for (let j = 0; j < 5; j++) {
        const randomAddressIndex = Math.floor(Math.random() * addresses.length);

        // Creating Doctor entries
        const doctor = {
          username: `dr${i * 5 + j}`,
          password: `docpass${i * 5 + j}`,
          firstName: doctorFirstNames[j % doctorFirstNames.length],
          lastName: doctorLastNames[j % doctorLastNames.length],
          gender: j % 2 === 0 ? "Male" : "Female",
          country: "USA",
          age: 30 + j * 2,
          phoneBook: 1234567890 + j,
          specialization: specialization[j % specialization.length],
          createdAt: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          address: addresses[randomAddressIndex],
          hospital: hospitals[i]._id,
          image: { data: Buffer.from("image data"), contentType: "image/jpeg" },
          patients: [], // Will be updated with linked patients later
        };

        // Creating Patient entries
        const patient = {
          username: `patient${i * 5 + j}`,
          password: `patpass${i * 5 + j}`,
          firstName: patientFirstNames[j % patientFirstNames.length],
          lastName: patientLastNames[j % patientLastNames.length],
          gender: j % 2 === 0 ? "Female" : "Male",
          country: "USA",
          age: 20 + j * 3,
          phoneBook: 2345678901 + j,
          createdAt: new Date(),
          address: addresses[randomAddressIndex],
          hospital: hospitals[i]._id,
          doctor: [], // Will update this with corresponding doctors after inserting
          image: { data: Buffer.from("image data"), contentType: "image/jpeg" },
        };

        // Push both doctor and patient data to arrays
        doctorData.push(doctor);
        patientData.push(patient);
      }
    }

    const doctors = await Doctor.insertMany(doctorData);
    const patients = await Patient.insertMany(patientData);

    // Updating patients with their corresponding doctors
    for (const patient of patients) {
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      await Patient.findByIdAndUpdate(patient._id, {
        doctor: randomDoctor._id,
      });
      await Doctor.findByIdAndUpdate(randomDoctor._id, {
        $push: { patients: patient._id },
      });
    }

    // HealthRecords
    const healthRecords = await HealthRecord.insertMany(
      patients.map((patient) => ({
        patient: patient._id,
        treatments: [], // Will add treatments separately
        createdAt: new Date(),
      })),
    );

    // Medications
    const medications = await Medication.insertMany([
      { name: "Aspirin", quantity: 30, fee: 10, createdAt: new Date() },
      { name: "Ibuprofen", quantity: 20, fee: 15, createdAt: new Date() },
      { name: "Tylenol", quantity: 30, fee: 4.99, createdAt: new Date() },
      { name: "Amoxicillin", quantity: 20, fee: 10.99, createdAt: new Date() },
      { name: "Benadryl", quantity: 25, fee: 7.99, createdAt: new Date() },
    ]);

    // Treatments
    const treatments = await Treatment.insertMany(
      patients.map((patient, index) => ({
        name: `Treatment ${index + 1}`,
        date: new Date(),
        totalFee: 100 + index * 10,
        doctor: doctors[Math.floor(Math.random() * doctors.length)]._id,
        medications: [
          medications[Math.floor(Math.random() * medications.length)]._id,
        ],
        createdAt: new Date(),
      })),
    );

    // Updating HealthRecords with treatments
    await Promise.all(
      healthRecords.map((record, index) =>
        HealthRecord.findByIdAndUpdate(record._id, {
          treatments: [treatments[index % treatments.length]].map(
            (treatment) => treatment._id,
          ),
        }),
      ),
    );

    // Appointments
    await Appointment.insertMany(
      patients.map((patient, index) => ({
        title: `Appointment ${index + 1}`,
        patient: patient._id,
        doctor: doctors[Math.floor(Math.random() * doctors.length)]._id,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
        status: "Scheduled",
        createdAt: new Date(),
      })),
    );

    // Messages
    await Message.insertMany([
      {
        sender: doctors[0]._id,
        recipient: patients[0]._id,
        onModel: "Patient",
        content: "Your appointment is confirmed.",
        dateSent: new Date(),
      },
      {
        sender: patients[1]._id,
        recipient: doctors[1]._id,
        onModel: "Doctor",
        content: "I need to reschedule my appointment.",
        dateSent: new Date(),
      },
      {
        sender: doctors[2]._id,
        recipient: patients[2]._id,
        onModel: "Patient",
        content: "Your lab results are ready.",
        dateSent: new Date(),
      },
      {
        sender: patients[3]._id,
        recipient: doctors[3]._id,
        onModel: "Doctor",
        content: "Can I get a prescription refill?",
        dateSent: new Date(),
      },
      {
        sender: doctors[4]._id,
        recipient: patients[4]._id,
        onModel: "Patient",
        content: "Reminder for your upcoming appointment.",
        dateSent: new Date(),
      },
    ]);

    console.log("Database seeding completed successfully!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
