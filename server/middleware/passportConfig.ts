import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { Admin } from "../models/admin";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};
// jwt authentication strategy

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const admin = await Admin.findById(jwt_payload.id);
      if (admin) {
        return done(null, admin);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

module.exports = passport;
