export class DatabaseError extends Error {
  constructor(message = "A database error occurred. Please try again later.") {
    super(message);
    this.name = "DatabaseError";
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
