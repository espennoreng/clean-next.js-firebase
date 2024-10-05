export class UserDisabledError extends Error {
  constructor(message = "User disabled") {
    super(message);
    this.name = "UserDisabledError";
    this.message = message;
    Object.setPrototypeOf(this, UserDisabledError.prototype);
  }
}
