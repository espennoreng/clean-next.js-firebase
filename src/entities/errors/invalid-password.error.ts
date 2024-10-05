export class InvalidPasswordError extends Error {
  constructor(message = "The password must be at least 6 characters long.") {
    super(message);
    this.name = "InvalidPasswordError";
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
