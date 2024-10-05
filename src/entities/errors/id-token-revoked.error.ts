export class IDTokenRevokedError extends Error {
  constructor(message = "The ID token has been revoked.") {
    super(message);
    this.name = "IDTokenRevokedError";
    Object.setPrototypeOf(this, IDTokenRevokedError.prototype);
  }
}
