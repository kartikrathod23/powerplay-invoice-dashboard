import request from "supertest";
import app from "../src/app";

describe("Invoice Validation", () => {
  it("should reject invalid invoice", async () => {
    const response = await request(app).post("/api/invoices").send({invoiceId: "",});

    expect(response.status).toBe(400);

  });

});