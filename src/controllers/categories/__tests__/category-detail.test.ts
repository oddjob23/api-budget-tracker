import { signin } from "./../../../test/utils";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../server";

describe("Category - Detail action", () => {
  it("should return 401 if user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app).get(`/api/v1/categories/${id}`).expect(401);
  });
  it("should return 404 if category with given Id doesn't exist", async () => {
    const token = await signin();
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/v1/categories/${id}`)
      .set("Cookie", token)
      .expect(404);
  });
  it("should throw 400 if bad ID is passed in as parameter", async () => {
    const token = await signin();
    await request(app)
      .get("/api/v1/categories/123")
      .set("Cookie", token)
      .expect(400);
  });

  it("should return status 200 and category", async () => {
    const token = await signin();
    const category = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "Test" })
      .expect(201);
    const res = await request(app)
      .get(`/api/v1/categories/${category.body._id}`)
      .set("Cookie", token)
      .expect(200);

    expect(res.body._id).toBeDefined();
    expect(res.body.name).toEqual("Test");
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });
});
