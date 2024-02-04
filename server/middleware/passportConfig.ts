import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";

// Admin authentication strategy
passport.use(
  "admin",
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await Admin.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Admin Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Admin Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Doctor authentication strategy
passport.use(
  "doctor",
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await Doctor.findOne({ username: username });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect Doctor Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Doctor Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Patient authentication strategy
passport.use(
  "patient",
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await Patient.findOne({ username: username });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect Patient Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Patient Password" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const adminUser = await Admin.findById(id);
    const doctorUser = await Doctor.findById(id);
    const patientUser = await Patient.findById(id);
    if (adminUser) {
      done(null, adminUser);
    } else if (doctorUser) {
      done(null, doctorUser);
    } else if (patientUser) {
      done(null, patientUser);
    } else {
      done(new Error("User not found during serialization"));
    }
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
