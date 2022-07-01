import request from "supertest";
import { app } from "../../../server";

describe("Authentication tests", () => {
  describe("Register", () => {
    it("should return other than 404 status code on /api/v1/auth/register", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});
      expect(response.statusCode).not.toEqual(404);
    });
    it("should return status 400 bad request when bad body is passed", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});
      expect(response.statusCode).toEqual(400);
    });
  });
});
