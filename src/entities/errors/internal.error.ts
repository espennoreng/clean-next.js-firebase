export class InternalError extends Error {
  constructor(message = "An internal error occurred. Please try again later.") {
    super(message);
    this.name = "InternalError";
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
