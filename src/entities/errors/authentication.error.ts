export class AuthenticationError extends Error {
  constructor(
    message = "Authentication failed. Please check your credentials."
  ) {
    super(message);
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
