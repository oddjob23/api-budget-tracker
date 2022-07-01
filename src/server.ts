import express from "express";
import { AuthenticationRouter } from "./controllers/auth/auth.controller";

const app = express();

app.use("/api/v1/auth", AuthenticationRouter);

export { app };
