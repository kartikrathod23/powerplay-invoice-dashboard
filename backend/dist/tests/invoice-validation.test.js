"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Invoice Validation", () => {
    it("should reject invalid invoice", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/invoices").send({ invoiceId: "", });
        expect(response.status).toBe(400);
    });
});
