import request from "supertest";
import { CategoryModel } from "../../../models/category/category";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Category - DELETE action", () => {
  it("should return 401 if user is not authenticated", async () => {
    await request(app).delete("/api/v1/categories/123").expect(401);
  });
  it("should return 204 and succesfully delete a category", async () => {
    const token = await signin();
    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "test" })
      .expect(201);

    await request(app)
      .delete(`/api/v1/categories/${cat.body._id}`)
      .set("Cookie", token)
      .send({})
      .expect(204);

    const categories = await CategoryModel.find({});
    expect(categories.length).toBe(0);
  });
});
