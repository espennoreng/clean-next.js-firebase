export class OperationNotAllowedError extends Error {
  constructor(message = "The requested operation is not allowed.") {
    super(message);
    this.name = "OperationNotAllowedError";
    Object.setPrototypeOf(this, OperationNotAllowedError.prototype);
  }
}
