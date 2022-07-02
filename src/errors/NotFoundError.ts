import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor() {
    super("Resource not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: "Not found" }];
  }
}
