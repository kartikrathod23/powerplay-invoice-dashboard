import request from "supertest";
import app from "../src/app";

describe("Analytics API", () => {
  it("should return analytics summary", async () => {
    const response = await request(app).get("/api/analytics/summary");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("totalBilled");
    expect(response.body.data).toHaveProperty("invoiceCount");

  });

});