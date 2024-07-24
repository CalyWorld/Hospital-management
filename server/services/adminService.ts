import { Request } from "express";
import { IAdmin } from "../models/admin";

export class AdminService {
  async getAdmin(req: Request): Promise<IAdmin | null> {
    try {
      const adminUser = req.user as IAdmin;
      return adminUser || null;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching admin user");
    }
  }
}
