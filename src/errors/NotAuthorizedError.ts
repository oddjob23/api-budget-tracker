import { BaseError } from "./BaseError";

export class NotAuthorizedError extends BaseError {
  statusCode = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return [
      {
        message: "Not authorized",
      },
    ];
  }
}
