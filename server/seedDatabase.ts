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

function atLocalTime(baseDate: Date, hour: number, minute = 0) {
  const date = new Date(baseDate);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function addDays(baseDate: Date, days: number) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date;
}

function randomDateInRange(start: Date, end: Date) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);
  return new Date(randomMs);
}
export async function seedDatabase() {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    const todayAvailabilityStart = atLocalTime(now, 9, 0);
    const tomorrowAvailabilityStart = atLocalTime(addDays(now, 1), 9, 0);
    const nextWeekAvailabilityStart = atLocalTime(addDays(now, 7), 9, 0);

    // SuperAdmin
    const superAdmin = await SuperAdmin.create({
      username: "superadmin1",
      password: await hashPassword("superadminpass"),
      createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
    });

    // Hospitals
    const hospitals = await Hospital.insertMany([
      {
        name: "City Hospital",
        address: "123 Main St",
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Greenwood Medical Center",
        address: "456 Elm St",
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Sunnydale Clinic",
        address: "789 Oak St",
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Downtown Health",
        address: "101 Pine St",
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Lakeside Hospital",
        address: "202 Maple St",
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
    ]);

    // Admins
    const admins = await Admin.insertMany([
      {
        username: "admin1",
        password: await hashPassword("password1"),
        role: "hospital-admin",
        hospital: hospitals[0]._id,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        username: "admin2",
        password: await hashPassword("password2"),
        role: "hospital-admin",
        hospital: hospitals[1]._id,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        username: "admin3",
        password: await hashPassword("password3"),
        role: "hospital-admin",
        hospital: hospitals[2]._id,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        username: "admin4",
        password: await hashPassword("password4"),
        role: "hospital-admin",
        hospital: hospitals[3]._id,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        username: "admin5",
        password: await hashPassword("password5"),
        role: "hospital-admin",
        hospital: hospitals[4]._id,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
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
        const availabilityStart =
          i === 0 && j === 0
            ? todayAvailabilityStart
            : i === 0 && j === 1
              ? tomorrowAvailabilityStart
              : i === 0 && j === 2
                ? nextWeekAvailabilityStart
                : atLocalTime(
                    randomDateInRange(currentMonthStart, nextMonthEnd),
                    8 + (j % 3),
                    0,
                  );
        const availabilityEnd = atLocalTime(availabilityStart, 17, 0);

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
          createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
          startTime: availabilityStart,
          endTime: availabilityEnd,
          startDate: availabilityStart,
          endDate: availabilityEnd,
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
          createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
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
        doctor: [randomDoctor._id],
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
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      })),
    );

    // Medications
    const medications = await Medication.insertMany([
      {
        name: "Aspirin",
        quantity: 30,
        fee: 10,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Ibuprofen",
        quantity: 20,
        fee: 15,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Tylenol",
        quantity: 30,
        fee: 4.99,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Amoxicillin",
        quantity: 20,
        fee: 10.99,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        name: "Benadryl",
        quantity: 25,
        fee: 7.99,
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
    ]);

    // Treatments
    const treatments = await Treatment.insertMany(
      patients.map((patient, index) => ({
        name: `Treatment ${index + 1}`,
        date: randomDateInRange(currentMonthStart, nextMonthEnd),
        totalFee: 100 + index * 10,
        doctor: doctors[Math.floor(Math.random() * doctors.length)]._id,
        medications: [
          medications[Math.floor(Math.random() * medications.length)]._id,
        ],
        createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
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
      patients.map((patient, index) => {
        const chosenDoctor = doctors[Math.floor(Math.random() * doctors.length)];
        const anchorDate =
          index % 10 === 0
            ? todayAvailabilityStart
            : index % 10 === 1
              ? tomorrowAvailabilityStart
              : index % 10 === 2
                ? nextWeekAvailabilityStart
                : randomDateInRange(currentMonthStart, nextMonthEnd);
        const startDate = atLocalTime(anchorDate, 9 + (index % 7), 0);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        return {
          title: `Appointment ${index + 1}`,
          patient: patient._id,
          doctor: chosenDoctor._id,
          startDate,
          endDate,
          status: index % 5 === 0 ? "Completed" : "Scheduled",
          createdAt: randomDateInRange(currentMonthStart, nextMonthEnd),
        };
      }),
    );

    // Messages
    await Message.insertMany([
      {
        sender: doctors[0]._id,
        recipient: patients[0]._id,
        onModel: "Patient",
        content: "Your appointment is confirmed.",
        dateSent: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        sender: patients[1]._id,
        recipient: doctors[1]._id,
        onModel: "Doctor",
        content: "I need to reschedule my appointment.",
        dateSent: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        sender: doctors[2]._id,
        recipient: patients[2]._id,
        onModel: "Patient",
        content: "Your lab results are ready.",
        dateSent: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        sender: patients[3]._id,
        recipient: doctors[3]._id,
        onModel: "Doctor",
        content: "Can I get a prescription refill?",
        dateSent: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
      {
        sender: doctors[4]._id,
        recipient: patients[4]._id,
        onModel: "Patient",
        content: "Reminder for your upcoming appointment.",
        dateSent: randomDateInRange(currentMonthStart, nextMonthEnd),
      },
    ]);

    console.log("Database seeding completed successfully!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
