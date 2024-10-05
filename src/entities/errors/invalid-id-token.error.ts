export class InvalidIDTokenError extends Error {
  constructor(message = "The provided ID token is invalid.") {
    super(message);
    this.name = "InvalidIDTokenError";
    Object.setPrototypeOf(this, InvalidIDTokenError.prototype);
  }
}
