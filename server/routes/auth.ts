import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/admin/login", (req: Request, res: Response) => {
  res.send("Admin login");
});

router.post("/api/admin/login", (req: Request, res: Response) => {
  res.send("Admin login");
});

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
