import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";
describe("Transaction list", () => {
  it("should return status other than 404", async () => {
    const res = await request(app).get("/api/v1/transactions");
    expect(res.statusCode).not.toEqual(404);
  });

  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app).get("/api/v1/transactions");
    expect(res.statusCode).toEqual(401);
  });

  it("should return 200 success and a list of transactions for given user", async () => {
    const token = await signin();

    await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "Test transaction",
        amount: 5000,
      })
      .expect(201);

    const res = await request(app)
      .get("/api/v1/transactions")
      .set("Cookie", token)
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
