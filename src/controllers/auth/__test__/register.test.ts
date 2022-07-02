import request from "supertest";
import { User } from "../../../models/user/user";
import { app } from "../../../server";

describe("Authentication tests", () => {
  describe("Register - route exists", () => {
    it("should return other than 404 status code on /api/v1/auth/register", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});
      expect(response.statusCode).not.toEqual(404);
    });
  });

  describe("Register - request validation", () => {
    it("should return status 400 bad request when bad body is passed", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});
      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].field).toEqual("email");
      expect(response.body.errors[1].field).toEqual("password");
    });
    it("should return status 400 bad request when invalid e-mail is passed in", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "asdf",
      });
      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].message).toEqual(
        "A valid e-mail must be provided"
      );
    });
    it("should return status 400 bad request when invalid password is passed in", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@test.com",
      });
      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].message).toEqual(
        "A valid password must be provided"
      );
    });
  });

  describe("Register - business logic", () => {
    it("Should throw an error - Bad Request - if user with provided e-mail already exists", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@test.com",
          password: "test1234",
        })
        .expect(201);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@test.com",
          password: "aaa123",
        })
        .expect(400);
      expect(response.statusCode).toEqual(400);
      expect(response.body.errors[0].message).toEqual(
        "There was an error with your request. Please check your e-mail address or password"
      );
    });

    it("Should succesfully register the user - save the user in database", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@test.com",
          password: "test1234",
        })
        .expect(201);

      const user = await User.findOne({ email: "test@test.com" });
      expect(user).toBeDefined();
      if (!user) {
        throw new Error("user not found");
      }
      expect(user.email).toEqual("test@test.com");
    });

    it("Should succesfully set cookie after succussful register", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          email: "test@test.com",
          password: "test1234",
        })
        .expect(201);

      expect(response.get("Set-Cookie")).toBeDefined();
    });
  });
});
