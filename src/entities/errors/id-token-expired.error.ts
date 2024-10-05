export class IDTokenExpiredError extends Error {
  constructor(message = "The ID token has expired.") {
    super(message);
    this.name = "IDTokenExpiredError";
    Object.setPrototypeOf(this, IDTokenExpiredError.prototype);
  }
}
