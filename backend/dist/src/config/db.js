"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        if (process.env.NODE_ENV !== "test") {
            console.log("MongoDB Connected");
        }
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await mongoose_1.default.disconnect();
};
exports.disconnectDB = disconnectDB;
