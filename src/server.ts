import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { AuthenticationRouter } from "./controllers/auth/auth.controller";
import cookieSession from "cookie-session";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import { NotFoundError } from "./errors/NotFoundError";
import { TransactionRotuer } from "./controllers/transactions/transaction.controller";
import { currentUser } from "./middlewares/CurrentUser";
import { requireAuth } from "./middlewares/RequireAuth";
import { CategoryRouter } from "./controllers/categories/categories.controller";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/v1/auth", AuthenticationRouter);
app.use("/api/v1/transactions", [currentUser, requireAuth], TransactionRotuer);
app.use("/api/v1/categories", [currentUser, requireAuth], CategoryRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(ErrorHandler);
export { app };
