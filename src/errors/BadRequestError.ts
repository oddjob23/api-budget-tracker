import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
