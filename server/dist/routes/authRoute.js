"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = require("../models/admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const asyncHandler = require("express-async-handler");
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
const generateToken = (admin) => {
    const payload = {
        id: admin._id,
        username: admin.username,
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "24h" });
};
// Admin authentication
router.post("/api/admin/login", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const admin = yield admin_1.Admin.findOne({ username });
        if (!admin)
            return res.status(401).json({ message: "incorrect admin Username" });
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ message: "incorrect admin password" });
        const token = generateToken(admin);
        res.json({ token, admin: { id: admin._id, username: admin.username } });
    }
    catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})));
router.get("/api/admin/logout", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.json(null);
        });
    }
    catch (err) {
        console.log(err);
    }
})));
module.exports = router;
