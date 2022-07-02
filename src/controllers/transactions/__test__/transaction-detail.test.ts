import { signin } from "./../../../test/utils";
import request from "supertest";
import { app } from "../../../server";
import mongoose from "mongoose";

describe("Transaction detail controller", () => {
  it("Should return status code 401 if user is not authenticated", async () => {
    await request(app).get("/api/v1/transactions/23421").send({}).expect(401);
  });

  it("should return 400 if given transaction doesn't belong to the user", async () => {
    const token = await signin();

    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "Test user 1 transaction",
        amount: 5000,
      });

    const user2 = await request(app).post("/api/v1/auth/register").send({
      email: "test2@test.com",
      password: "user2",
    });
    const token2 = user2.get("Set-Cookie");

    const response = await request(app)
      .get(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token2);
    expect(response.statusCode).toEqual(400);
  });

  it("should return 404 - not found - if given ID doesn't return transaction", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/v1/transactions/${id}`)
      .set("Cookie", token)
      .send({})
      .expect(404);
  });

  it("should return 200 - success - and a transaction object in the response", async () => {
    const token = await signin();

    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "Test user 1 transaction",
        amount: 5000,
      });

    const response = await request(app)
      .get(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({});

    expect(response.statusCode).toEqual(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.name).toBeDefined();
    expect(response.body.amount).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });
});
