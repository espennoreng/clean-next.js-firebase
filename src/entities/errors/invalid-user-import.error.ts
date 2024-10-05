export class InvalidUserImportError extends Error {
  constructor(message = "Invalid user import data provided.") {
    super(message);
    this.name = "InvalidUserImportError";
    Object.setPrototypeOf(this, InvalidUserImportError.prototype);
  }
}
