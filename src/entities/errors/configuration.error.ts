export class ConfigurationError extends Error {
  constructor(message = "A configuration error occurred.") {
    super(message);
    this.name = "ConfigurationError";
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}
