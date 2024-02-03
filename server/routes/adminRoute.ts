import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
const asyncHandler = require("express-async-handler");

//get admin user
router.get(
  "/api/admin",
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
