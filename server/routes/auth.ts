import express, { Request, Response } from "express";
import passport from "passport";
const router = express.Router();
import { Admin } from "../models/admin";
const asyncHandler = require("express-async-handler");

router.post(
  "/api/admin/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/api/admin/login",
  }),
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const username = req.user;
      console.log(username);
      try {
        res.json(username);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

router.post("/api/admin/logout", (req: Request, res: Response) => {
  res.send("Admin logout");
});

router.post("/api/doctor/signup", (req: Request, res: Response) => {
  res.send("doctor login");
});

router.post("/api/doctor/login", (req: Request, res: Response) => {
  res.send("doctor login");
});

router.post("/api/doctor/logout", (req: Request, res: Response) => {
  res.send("doctor logout");
});

router.post("/api/patient/signup", (req: Request, res: Response) => {
  res.send("patient signup");
});

router.post("/api/patient/login", (req: Request, res: Response) => {
  res.send("patient login");
});

router.post("/api/patient/logout", (req: Request, res: Response) => {
  res.send("patient login");
});

module.exports = router;
