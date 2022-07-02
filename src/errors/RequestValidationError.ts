import { ValidationError } from "express-validator";
import { BaseError } from "./BaseError";

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request - either body or params are not properly formatted");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
