import request from "supertest";
import { app } from "../server";

export const signin = async (): Promise<string[]> => {
  const email = "test@test.com";
  const password = "test1234";

  const response = await request(app)
    .post("/api/v1/auth/register")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
