import request from "supertest";
import { app } from "../../../server";
import { signin } from "../../../test/utils";

describe("Category LIST action", () => {
  it("should return other than 404 status code", async () => {
    const res = await request(app).get("/api/v1/categories").send({});
    expect(res.statusCode).not.toEqual(404);
  });
  it("should return 401 if user is not authenticated", async () => {
    await request(app).get("/api/v1/categories").send({}).expect(401);
  });
  it("should return 200 status and a list of categories for given user", async () => {
    const token = await signin();
    const res = await request(app)
      .get("/api/v1/categories")
      .set("Cookie", token)
      .send({});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });
});
