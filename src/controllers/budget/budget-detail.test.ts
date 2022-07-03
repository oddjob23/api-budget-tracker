import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../server";
import { signin } from "../../test/utils";

describe("Budget - DETAIL - action", () => {
  it("should throw 404 for non existing budget", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/v1/budgets/${id}`)
      .set("Cookie", token)
      .send({})
      .expect(404);
  });
  it("should throw 401 for non authenticated user", async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app).get(`/api/v1/budgets/${id}`).send({}).expect(401);
  });
  it("should throw 500 for invalid ID passed in", async () => {
    const id = 123;
    const token = await signin();

    await request(app)
      .get(`/api/v1/budgets/${id}`)
      .set("Cookie", token)
      .send({})
      .expect(500);
  });
  it("should return 200 success and budget object", async () => {
    const token = await signin();
    const budgetRes = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({
        title: "January",
        startAmount: 120000,
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({})
      .expect(200);

    expect(response.body._id).toBeDefined();
    expect(response.body.title).toBeDefined();
    expect(response.body.expenses).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });
});
