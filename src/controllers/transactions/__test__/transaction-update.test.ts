import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";
describe("Transaction update PUT", () => {
  it("Should return 404 if transaction doesn't exist", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .put(`/api/v1/transactions/${id}`)
      .set("Cookie", token)
      .send({ name: "asdf" })
      .expect(404);
  });
  it("should return 401 if user is not authenticated", async () => {
    const token = await signin();
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "test",
        amount: 1,
      });
    await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .send({ name: "asdf" })
      .expect(401);
  });
  it("should return 400 if user is not the owner of transaction", async () => {
    const token = await signin();
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "test",
        amount: 1,
      });
    const user2 = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "test2@test.com", password: "123452345234" });
    const token2 = user2.get("Set-Cookie");
    await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token2)
      .send({ name: "asdf" })
      .expect(400);
  });

  it("should return 400 bad request if body is empty", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .put(`/api/v1/transactions/${id}`)
      .set("Cookie", token)
      .send({})
      .expect(400);
  });

  it("should return status 200 - success - and update transaction with given values", async () => {
    const token = await signin();
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "test",
        amount: 1,
      });

    const updatedTransaction = await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({
        amount: 2,
      });

    expect(updatedTransaction.statusCode).toEqual(200);
    expect(updatedTransaction.body.amount).toEqual(2);

    const updatedTransaction2 = await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({
        amount: 0,
        name: "",
      });
    expect(updatedTransaction2.statusCode).toEqual(200);
    expect(updatedTransaction2.body.name).not.toEqual("");

    const updatedTransaction3 = await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({
        amount: 0,
        name: "test",
        description: "test",
      });
    expect(updatedTransaction3.statusCode).toEqual(200);
    expect(updatedTransaction3.body.name).toEqual("test");
    expect(updatedTransaction3.body.description).toEqual("test");
  });
  it("should update transaction with provided category", async () => {
    const token = await signin();
    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "test" })
      .expect(201);
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "test",
        amount: 1,
      });

    const updatedTransaction = await request(app)
      .put(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({
        category: cat.body._id,
      });

    expect(updatedTransaction.statusCode).toEqual(200);
    expect(updatedTransaction.body.category).toBeDefined();
  });
});
