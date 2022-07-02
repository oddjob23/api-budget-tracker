import mongoose from "mongoose";
import request from "supertest";
import { TransactionModel } from "../../../models/transaction/transaction";
import { app } from "../../../server";
import { signin } from "../../../test/utils";
describe("DELETE action", () => {
  it("should throw 401 if user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .delete(`/api/v1/transactions/${id}`)
      .send({})
      .expect(401);
  });
  it("should throw 400 bad request if given user doesn't own the transaction", async () => {
    const token = await signin();
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "should be deleted",
        amount: 1,
      })
      .expect(201);
    const user2 = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "user2@test.com",
        password: "user123",
      })
      .expect(201);
    const token2 = user2.get("Set-Cookie");

    await request(app)
      .delete(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token2)
      .send({})
      .expect(400);
  });
  it("should throw 404 if given ID doesn't result in transaction", async () => {
    const token = await signin();

    const id = new mongoose.Types.ObjectId();
    await request(app)
      .delete(`/api/v1/transactions/${id}`)
      .set("Cookie", token)
      .expect(404);
  });

  it("should return 204 no content and succesfully delete a transaction", async () => {
    const token = await signin();
    const transaction = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", token)
      .send({
        name: "should be deleted",
        amount: 1,
      })
      .expect(201);

    await request(app)
      .delete(`/api/v1/transactions/${transaction.body._id}`)
      .set("Cookie", token)
      .send({})
      .expect(204);

    const transactions = await TransactionModel.find({});
    expect(transactions.length).toEqual(0);
  });
});
