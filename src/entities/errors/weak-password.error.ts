export class WeakPasswordError extends Error {
  constructor(
    message = "The password is too weak. Please choose a stronger password."
  ) {
    super(message);
    this.name = "WeakPasswordError";
    Object.setPrototypeOf(this, WeakPasswordError.prototype);
  }
}
