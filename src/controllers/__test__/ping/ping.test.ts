import request from "supertest";
import { app } from "../../../server";
// describe("Ping controller tests", () => {

// });
it("should not return 404", async () => {
  const response = await request(app).get("/api/ping").send({});
  expect(response.statusCode).not.toEqual(404);
});
