export class SessionCookieExpiredError extends Error {
  constructor(message = "The session cookie has expired.") {
    super(message);
    this.name = "SessionCookieExpiredError";
    Object.setPrototypeOf(this, SessionCookieExpiredError.prototype);
  }
}
