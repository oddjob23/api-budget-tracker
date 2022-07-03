import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Budget - UPDATE - action", () => {
  it("should return 401 if user is not authenticated", async () => {
    await request(app).put(`/api/v1/budgets/123`).send({}).expect(401);
  });
  it("should return 404 not found", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .put(`/api/v1/budgets/${id}`)
      .set("Cookie", token)
      .send({
        title: "test",
      })
      .expect(404);
  });
  it("should return 400 bad requset for invalid ID passed", async () => {
    const token = await signin();
    await request(app)
      .put(`/api/v1/budgets/${1}`)
      .set("Cookie", token)
      .send({
        title: "test",
      })
      .expect(400);
    await request(app)
      .put(`/api/v1/budgets/asdf`)
      .set("Cookie", token)
      .send({
        title: "test",
      })
      .expect(400);
  });
  it("should return 400 bad request if invalid body is passed", async () => {
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
      .put(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({})
      .expect(400);

    expect(response.body.errors[0].message).toEqual("Invalid body passed in");
  });
  it("should return status 200 and succesfully update budget", async () => {
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
      .put(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({
        title: "updated",
      })
      .expect(200);

    expect(response.body._id).toBeDefined();
    expect(response.body.title).toEqual("updated");
  });
  it("should return status 200 and successfully update expenses on budget", async () => {
    const token = await signin();

    const res = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        amount: 12310,
        name: "This is a test transaction",
        description: "Test",
      })
      .expect(201);

    const budgetRes = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({
        title: "January",
        startAmount: 120000,
      })
      .expect(201);

    const response = await request(app)
      .put(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({
        expenses: [res.body._id],
      })
      .expect(200);

    expect(response.body.expenses).toHaveLength(1);
  });
  it("should return status 200 and successfully add 2 or more expenses on budget", async () => {
    const token = await signin();

    const res = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        amount: 12310,
        name: "This is a test transaction",
        description: "Test",
      })
      .expect(201);
    const res2 = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        amount: 12310,
        name: "This is a test transaction",
        description: "Test",
      })
      .expect(201);

    const budgetRes = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({
        title: "January",
        startAmount: 120000,
      })
      .expect(201);

    const response = await request(app)
      .put(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({
        expenses: [res.body._id, res2.body._id],
      })
      .expect(200);

    expect(response.body.expenses).toHaveLength(2);
  });
  it("should return status 200 and successfully update both title and expenses", async () => {
    const token = await signin();

    const res = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        amount: 12310,
        name: "This is a test transaction",
        description: "Test",
      })
      .expect(201);

    const budgetRes = await request(app)
      .post("/api/v1/budgets")
      .set("Cookie", token)
      .send({
        title: "January",
        startAmount: 120000,
      })
      .expect(201);

    const response = await request(app)
      .put(`/api/v1/budgets/${budgetRes.body._id}`)
      .set("Cookie", token)
      .send({
        title: "updated",
        startAmount: 555,
        expenses: [res.body._id],
      })
      .expect(200);

    expect(response.body.title).toEqual("updated");
    expect(response.body.startAmount).toEqual(555);
    expect(response.body.expenses).toHaveLength(1);
  });
});
