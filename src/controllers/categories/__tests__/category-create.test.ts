import { signin } from "./../../../test/utils";
import request from "supertest";
import { app } from "../../../server";
import { CategoryModel } from "../../../models/category/category";

describe("Category CREATE action", () => {
  it("should return other than 404 status code", async () => {
    const res = await request(app).post("/api/v1/categories").send({});
    expect(res.statusCode).not.toBe(404);
  });

  it("should return 401 if user is not authenticated", async () => {
    await request(app).post("/api/v1/categories").send({}).expect(401);
  });

  it("should return 400 bad request if bad body is passed in", async () => {
    const token = await signin();
    const res = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].field).toEqual("name");
    expect(res.body.errors[1].message).toEqual(
      "A valid category name must be provided"
    );
  });
  it("should successfully insert new category", async () => {
    const token = await signin();
    const res = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "Test" })
      .expect(201);

    expect(res.body._id).toBeDefined();
    expect(res.body.name).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();

    const categories = await CategoryModel.find({});
    expect(categories.length).toEqual(1);
  });
});
