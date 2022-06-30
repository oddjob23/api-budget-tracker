import express from "express";
import { PingRouter } from "./controllers/__test__/ping/ping.controller";

const app = express();
const port = process.env.PORT || 8000;

app.use(PingRouter);

app.listen(port, () => {
  console.log("App is listening on port: ", port);
});

export { app };
