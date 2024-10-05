export class NetworkError extends Error {
  constructor(
    message = "A network error occurred. Please check your connection and try again."
  ) {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
