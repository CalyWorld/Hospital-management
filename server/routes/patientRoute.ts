import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get(
  "/api/patient",
  asyncHandler(async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const username = req.user;
      try {
        res.json(username);
      } catch (err) {
        console.log(err);
      }
    }
  }),
);

module.exports = router;
