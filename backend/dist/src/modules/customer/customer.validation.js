"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerParamsSchema = void 0;
const zod_1 = require("zod");
exports.customerParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        customerId: zod_1.z.string(),
    }),
});
