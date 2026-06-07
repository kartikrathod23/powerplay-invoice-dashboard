import request from "supertest";
import app from "../src/app";

describe("Customers API", () => {
  it("should return customers list", async () => {
    const response = await request(app).get("/api/customers");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);

  });

});