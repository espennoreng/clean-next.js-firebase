export class ValidationError extends Error {
  public errors: string[];

  constructor(errors: string[]) {
    const message = `Validation failed: ${errors.join(", ")}`;
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
