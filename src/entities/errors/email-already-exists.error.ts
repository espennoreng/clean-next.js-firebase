export class EmailAlreadyExistsError extends Error {
  constructor(
    message = "The email address is already in use by another account."
  ) {
    super(message);
    this.name = "EmailAlreadyExistsError";
    Object.setPrototypeOf(this, EmailAlreadyExistsError.prototype);
  }
}
