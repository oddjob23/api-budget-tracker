import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Category - UPDATE - action", () => {
  it("should return 401 if user is not authenticated", async () => {
    await request(app)
      .put("/api/v1/categories/123")
      .send({ name: "test" })
      .expect(401);
  });
  it("should return 400 if invalid body is passed in", async () => {
    const token = await signin();
    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "test" })
      .expect(201);
    const res = await request(app)
      .put(`/api/v1/categories/${cat.body._id}`)
      .set("Cookie", token)
      .send({})
      .expect(400);

    expect(res.body.errors[0].field).toEqual("name");
    // expect(res.body.errors[0].message).toEqual(
    //   "A valid category name must be provided"
    // );
  });

  it("should return 200 and succesfully updated category", async () => {
    const token = await signin();
    const cat = await request(app)
      .post("/api/v1/categories")
      .set("Cookie", token)
      .send({ name: "test" })
      .expect(201);

    const res = await request(app)
      .put(`/api/v1/categories/${cat.body._id}`)
      .set("Cookie", token)
      .send({
        name: "updated",
      })
      .expect(200);

    expect(res.body.name).toEqual("updated");
  });
});
