import { BaseError } from "./BaseError";

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;
  reason = "error connecting to database";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
