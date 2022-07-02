import { app } from "../../../server";
import request from "supertest";
import { signin } from "../../../test/utils";
import { TransactionModel } from "../../../models/transaction/transaction";
describe("Transactiosn - Create", () => {
  it("should return status code other than 404 - expects route to exist", async () => {
    const res = await request(app).post("/api/v1/transactions").send({});

    expect(res.statusCode).not.toEqual(404);
  });

  it("should return status code 401 if user is not authenticated", async () => {
    await request(app).post("/api/v1/transactions").send({}).expect(401);
  });

  it("should return status 400 bad request if required fields are not passed in", async () => {
    const cookie = await signin();
    const res = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", cookie)
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].field).toEqual("amount");
    expect(res.body.errors[0].message).toEqual(
      "A valid amount, greater than 0, must be provided"
    );

    expect(res.body.errors[1].field).toEqual("name");
    expect(res.body.errors[1].message).toEqual(
      "A name must be provided. Length of name must be between 4 and 120 characters"
    );
  });

  it("should return status code 201 - succesfully save Transaction in database", async () => {
    const cookie = await signin();
    const res = await request(app)
      .post("/api/v1/transactions")
      .set("Cookie", cookie)
      .send({
        amount: 12310,
        name: "This is a test transaction",
        description: "Test",
        date: new Date().toLocaleDateString(),
      });

    console.log(res.body.errors);

    expect(res.statusCode).toEqual(201);

    const transactions = await TransactionModel.find({});
    expect(transactions.length).toBe(1);
  });
});
