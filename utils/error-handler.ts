import { AuthenticationError } from "@/src/entities/errors/authentication.error";
import { ConfigurationError } from "@/src/entities/errors/configuration.error";
import { EmailAlreadyExistsError } from "@/src/entities/errors/email-already-exists.error";
import { InvalidEmailError } from "@/src/entities/errors/invalid-email.error";
import { InvalidPasswordError } from "@/src/entities/errors/invalid-password.error";
import { NetworkError } from "@/src/entities/errors/network.error";
import { OperationNotAllowedError } from "@/src/entities/errors/operation-not-allowed.error";
import { ServiceUnavailableError } from "@/src/entities/errors/service-unavailable.error";
import { UserNotFoundError } from "@/src/entities/errors/user-not-found.error";
import { InvalidCredentialError } from "@/src/entities/errors/invalid-credential.error";
import { InvalidIDTokenError } from "@/src/entities/errors/invalid-id-token.error";
import { IDTokenExpiredError } from "@/src/entities/errors/id-token-expired.error";
import { InvalidUserImportError } from "@/src/entities/errors/invalid-user-import.error";
import { WeakPasswordError } from "@/src/entities/errors/weak-password.error";
import { UnauthorizedError } from "@/src/entities/errors/unauthorized.error";
import { IDTokenRevokedError } from "@/src/entities/errors/id-token-revoked.error";
import { SessionCookieRevokedError } from "@/src/entities/errors/session-cookie-revoked.error";
import { TooManyRequestsError } from "@/src/entities/errors/to-many-requests.error";
import { InternalError } from "@/src/entities/errors/internal.error";
import { ValidationError } from "@/src/entities/errors/validation.error";
import { DatabaseError } from "@/src/entities/errors/database.error";
import { InvalidArgumentError } from "@/src/entities/errors/invalid-argument.error";
import { SessionCookieExpiredError } from "@/src/entities/errors/session-cookie-expired.error";

export type ErrorResponse = {
  error: string;
};

export function handleActionError(error: any): ErrorResponse {
  if (error instanceof InvalidEmailError) {
    return { error: error.message };
  } else if (error instanceof InvalidPasswordError) {
    return { error: error.message };
  } else if (error instanceof EmailAlreadyExistsError) {
    return { error: error.message };
  } else if (error instanceof OperationNotAllowedError) {
    return { error: error.message };
  } else if (error instanceof TooManyRequestsError) {
    return { error: error.message };
  } else if (error instanceof UserNotFoundError) {
    return { error: error.message };
  } else if (error instanceof AuthenticationError) {
    return { error: error.message };
  } else if (error instanceof ConfigurationError) {
    return { error: error.message };
  } else if (error instanceof InvalidCredentialError) {
    return { error: error.message };
  } else if (error instanceof InvalidIDTokenError) {
    return { error: error.message };
  } else if (error instanceof IDTokenExpiredError) {
    return { error: error.message };
  } else if (error instanceof InvalidUserImportError) {
    return { error: error.message };
  } else if (error instanceof WeakPasswordError) {
    return { error: error.message };
  } else if (error instanceof UnauthorizedError) {
    return { error: error.message };
  } else if (error instanceof IDTokenRevokedError) {
    return { error: error.message };
  } else if (error instanceof SessionCookieRevokedError) {
    return { error: error.message };
  } else if (error instanceof InternalError) {
    return { error: error.message };
  } else if (error instanceof ValidationError) {
    return { error: error.message };
  } else if (error instanceof DatabaseError) {
    return { error: error.message };
  } else if (error instanceof InvalidArgumentError) {
    return { error: error.message };
  } else if (error instanceof SessionCookieExpiredError) {
    return { error: error.message };
  } else if (
    error instanceof NetworkError ||
    error instanceof ServiceUnavailableError
  ) {
    return { error: "Network error, please try again later." };
  } else {
    console.error("Unexpected Error:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
