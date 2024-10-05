export class UnauthorizedError extends Error {
  constructor(
    message = "Unauthorized access. Please authenticate or check your permissions."
  ) {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
