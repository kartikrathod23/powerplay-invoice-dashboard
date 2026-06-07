"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../src/config/db");
dotenv_1.default.config({
    quiet: true
});
beforeAll(async () => {
    if (mongoose_1.default.connection.readyState === 0) {
        await (0, db_1.connectDB)();
    }
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
