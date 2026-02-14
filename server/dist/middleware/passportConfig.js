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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = require("../models/admin");
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};
// jwt authentication strategy
passport_1.default.use(new passport_jwt_1.Strategy(options, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.Admin.findById(jwt_payload.id);
        if (admin) {
            return done(null, admin);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
})));
module.exports = passport_1.default;
