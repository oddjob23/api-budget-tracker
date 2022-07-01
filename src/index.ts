import "dotenv/config";
import mongoose from "mongoose";

import { app } from "./server";

const port = process.env.PORT || 8000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to the database");
  } catch (err: any) {
    console.log("error connecting to db");
    console.error(err);
    throw new Error(err.message);
  }

  app.listen(port, () => {
    console.log("App is listening on port: ", port);
  });
};

start();
