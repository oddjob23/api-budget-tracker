import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/BaseError";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }
  console.log(err);
  return res.status(400).send({
    errors: [{ message: "Unhandled error" }],
  });
};
