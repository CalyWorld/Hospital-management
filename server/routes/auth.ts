import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Admin authentication
router.post(
  "/api/admin/login",
  passport.authenticate("admin", {
    successRedirect: "/api/admin",
    failureRedirect: "/api/admin/login",
  }),
);

//
router.get(
  "/api/admin",
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

router.get(
  "/api/admin/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json(null);
      });
    } catch (err) {
      console.log(err);
    }
  }),
);

// Doctor authentication
router.post(
  "/api/doctor/login",
  passport.authenticate("doctor", {
    successRedirect: "/api/doctor",
    failureRedirect: "/api/doctor/login",
  }),
);

router.post("/api/doctor/signup", (req: Request, res: Response) => {
  res.send("doctor sign up");
});

router.get(
  "/api/doctor",
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

router.get(
  "/api/doctor/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json(null);
      });
    } catch (err) {
      console.log(err);
    }
  }),
);

// Patient authentication
router.post(
  "/api/patient/login",
  passport.authenticate("patient", {
    successRedirect: "/api/patient",
    failureRedirect: "/api/patient/login",
  }),
);

router.post("/api/patient/signup", (req: Request, res: Response) => {
  res.send("patient signup");
});

router.get(
  "/api/patient",
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

router.get(
  "/api/patient/logout",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json(null);
      });
    } catch (err) {
      console.log(err);
    }
  }),
);

module.exports = router;
