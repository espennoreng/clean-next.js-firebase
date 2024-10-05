export class ServiceUnavailableError extends Error {
  constructor(
    message = "The service is currently unavailable. Please try again later."
  ) {
    super(message);
    this.name = "ServiceUnavailableError";
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}
