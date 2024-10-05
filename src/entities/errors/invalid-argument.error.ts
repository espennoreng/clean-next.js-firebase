export class InvalidArgumentError extends Error {
  constructor(message = "An invalid argument was provided.") {
    super(message);
    this.name = "InvalidArgumentError";
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}
