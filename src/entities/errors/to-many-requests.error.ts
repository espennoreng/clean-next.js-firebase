export class TooManyRequestsError extends Error {
  constructor(message = "Too many requests. Please try again later.") {
    super(message);
    this.name = "TooManyRequestsError";
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}
