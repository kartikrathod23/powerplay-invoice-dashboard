"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string(),
    NODE_ENV: zod_1.z.string(),
    MONGODB_URI: zod_1.z.string(),
});
exports.env = envSchema.parse(process.env);
