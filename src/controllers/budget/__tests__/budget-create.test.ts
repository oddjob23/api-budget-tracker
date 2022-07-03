import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Budget - CREATE - action", () => {
  it("should return other than 404 status code", async () => {
    const res = await request(app).post("/api/v1/budgets").send({});
    expect(res.statusCode).not.toBe(404);
  });
  it("should return 401 if user is not authenticated", async () => {
    await request(app).post("/api/v1/budgets").send({}).expect(401);
  });

  it("should return 400 bad request for invalid body", async () => {
    const token = await signin();
    const response = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({})
      .expect(400);

    expect(response.body.errors[0].field).toEqual("title");
    expect(response.body.errors[1].field).toEqual("startAmount");
  });

  it("should return 201 and succesfully add new budget", async () => {
    const token = await signin();
    const response = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({
        title: "January",
        startAmount: 120000,
      })
      .expect(201);

    expect(response.body._id).toBeDefined();
    expect(response.body.title).toBeDefined();
    expect(response.body.startAmount).toBeDefined();
    expect(response.body.expenses).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });
});
