export class InvalidEmailError extends Error {
  constructor(message = "The email address is badly formatted.") {
    super(message);
    this.name = "InvalidEmailError";
    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }
}
