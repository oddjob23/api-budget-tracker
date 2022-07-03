import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Budget - LIST - action", () => {
  it("should return status code other than 404", async () => {
    const res = await request(app).get("/api/v1/budgets").send({});
    expect(res.statusCode).not.toBe(404);
  });
  it("should return 401 if user is not authenticated", async () => {
    await request(app).get("/api/v1/budgets").send({}).expect(401);
  });
  it("should return status 200 and a list", async () => {
    const token = await signin();
    const res = await request(app)
      .get("/api/v1/budgets")
      .set("Cookie", token)
      .expect(200);
    expect(res.body).toHaveLength(0);
  });
});
