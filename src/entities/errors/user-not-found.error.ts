export class UserNotFoundError extends Error {
  constructor(message = "No user record found for the provided identifier.") {
    super(message);
    this.name = "UserNotFoundError";
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
