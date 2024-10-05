export class InvalidCredentialError extends Error {
  constructor(message = "Invalid credentials used to authenticate.") {
    super(message);
    this.name = "InvalidCredentialError";
    Object.setPrototypeOf(this, InvalidCredentialError.prototype);
  }
}
