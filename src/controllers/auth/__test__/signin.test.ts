import request from "supertest";
import { app } from "../../../server";
describe("Signin tests", () => {
  describe("Signin - route exists", () => {
    it("Should return status code other than 404", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send({});
      expect(res.statusCode).not.toEqual(404);
    });
  });
  describe("Signin - request validation", () => {
    it("Should return status code 400 bad request when bad body is passed in", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors[0].field).toEqual("email");
      expect(res.body.errors[0].message).toEqual(
        "A valid e-mail must be provided"
      );

      expect(res.body.errors[1].field).toEqual("password");
      expect(res.body.errors[1].message).toEqual(
        "A valid password must be provided"
      );
    });
  });
  describe("Signin - business logic", () => {
    it("Should return 400 bad request if use is not found", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send({
        email: "test@test.com",
        password: "test1234",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors[0].message).toEqual(
        "Invalid data sent to server. Please check your data and try again."
      );
    });
    it("Should return 400 bad request if invalid password is passed in", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test1@test.com",
          password: "test1234",
        })
        .expect(201);

      const res = await request(app).post("/api/v1/auth/signin").send({
        email: "test1@test.com",
        password: "incorrect",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors[0].message).toEqual(
        "Invalid e-mail or password provided. Please check your data and try again."
      );
    });
    it("Should return 200 success - succesfull login / should set cookies", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test1@test.com",
          password: "test1234",
        })
        .expect(201);

      const res = await request(app).post("/api/v1/auth/signin").send({
        email: "test1@test.com",
        password: "test1234",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.get("Set-Cookie")).toBeDefined();
    });
  });
});
