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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require("cors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport = require("./middleware/passportConfig");
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
}));
mongoose_1.default.set("strictQuery", false);
require("dotenv").config();
const mongoDB = (_b = process.env.MONGODB_URI) !== null && _b !== void 0 ? _b : "default_uri";
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongoDB);
        // console.log("connecting to database");
        // seedDatabase();
    });
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(adminRoutes);
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
