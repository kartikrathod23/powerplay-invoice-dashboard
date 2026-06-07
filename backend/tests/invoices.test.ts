import request from "supertest";
import app from "../src/app";

describe("Invoices API", () => {
  it("should return invoices", async () => {
    const response = await request(app).get("/api/invoices");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);

  });

});