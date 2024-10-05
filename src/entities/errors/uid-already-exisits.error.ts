export class SessionCookieRevokedError extends Error {
  constructor(message = "The session cookie has been revoked.") {
    super(message);
    this.name = "SessionCookieRevokedError";
    Object.setPrototypeOf(this, SessionCookieRevokedError.prototype);
  }
}
