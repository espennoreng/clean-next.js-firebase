import { SESSION_COOKIE } from "@/config";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationError } from "@/src/entities/errors/authentication.error";
import { ConfigurationError } from "@/src/entities/errors/configuration.error";
import { EmailAlreadyExistsError } from "@/src/entities/errors/email-already-exists.error";
import { IDTokenExpiredError } from "@/src/entities/errors/id-token-expired.error";
import { InternalError } from "@/src/entities/errors/internal.error";
import { InvalidArgumentError } from "@/src/entities/errors/invalid-argument.error";
import { InvalidEmailError } from "@/src/entities/errors/invalid-email.error";
import { InvalidIDTokenError } from "@/src/entities/errors/invalid-id-token.error";
import { InvalidPasswordError } from "@/src/entities/errors/invalid-password.error";
import { NetworkError } from "@/src/entities/errors/network.error";
import { OperationNotAllowedError } from "@/src/entities/errors/operation-not-allowed.error";
import { ServiceUnavailableError } from "@/src/entities/errors/service-unavailable.error";
import { SessionCookieExpiredError } from "@/src/entities/errors/session-cookie-expired.error";
import { TooManyRequestsError } from "@/src/entities/errors/to-many-requests.error";
import { SessionCookieRevokedError } from "@/src/entities/errors/uid-already-exisits.error";
import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";
import { admin } from "@/utils/firebase/admin";

import { injectable } from "inversify";
import ky from "ky";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private _sessionExpireIn: number = 60 * 60 * 24 * 5 * 1000; // 5 days

  async createUser({ email, password }: { email: string; password: string }) {
    const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!key) {
      throw new ConfigurationError("Firebase API key is not set");
    }

    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });

      const customToken = await admin.auth().createCustomToken(userRecord.uid);

      const res = await ky
        .post(
          "https://identitytoolkit.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken",
          {
            searchParams: {
              key,
            },
            json: {
              token: customToken,
              returnSecureToken: true,
            },
          }
        )
        .json<{ idToken: string }>();

      return { idToken: res.idToken, userId: userRecord.uid };
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-exists":
            throw new EmailAlreadyExistsError();
          case "auth/invalid-email":
            throw new InvalidEmailError();
          case "auth/invalid-password":
            throw new InvalidPasswordError();
          case "auth/operation-not-allowed":
            throw new OperationNotAllowedError(
              "Email/password accounts are not enabled."
            );
          case "auth/too-many-requests":
            throw new TooManyRequestsError();
          case "auth/internal-error":
            throw new InternalError();
          case "auth/invalid-argument":
            throw new InvalidArgumentError();
          default:
            // Handle other unexpected errors
            throw new AuthenticationError(
              "An unexpected error occurred during user creation."
            );
        }
      }
      if (error.response.status >= 500) {
        throw new ServiceUnavailableError(
          "Authentication service is currently unavailable. Please try again later."
        );
      }
      if (error.name === "HTTPError") {
        throw new NetworkError(
          "Network error occurred while verifying the custom token."
        );
      }
      throw new AuthenticationError(
        "An unexpected error occurred during user creation."
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return userRecord.uid;
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            return null;
          default:
            throw new AuthenticationError(
              "An unexpected error occurred while finding the user."
            );
        }
      }

      // Handle other unexpected errors
      throw new AuthenticationError(
        "An unexpected error occurred during user finding."
      );
    }
  }

  async createSession(userId: User["id"], idToken: string) {
    try {
      const cookie: Cookie = {
        name: SESSION_COOKIE,
        value: await admin.auth().createSessionCookie(idToken, {
          expiresIn: this._sessionExpireIn,
        }),
        attributes: {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        },
      };

      const session: Session = {
        id: "sessionId",
        userId,
        expiresAt: new Date(Date.now() + this._sessionExpireIn),
      };

      return { cookie, session };
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-id-token":
            throw new InvalidIDTokenError();
          case "auth/id-token-expired":
            throw new IDTokenExpiredError();
          case "auth/argument-error":
            throw new InvalidArgumentError();
          case "auth/internal-error":
            throw new InternalError();
          default:
            throw new AuthenticationError("Failed to create session.");
        }
      }

      // Handle network errors
      if (error.name === "HTTPError") {
        if (error.response.status >= 500) {
          throw new ServiceUnavailableError(
            "Authentication service is currently unavailable. Please try again later."
          );
        } else {
          throw new NetworkError(
            "Network error occurred while creating session."
          );
        }
      }

      // Handle other unexpected errors
      throw new AuthenticationError(
        "An unexpected error occurred during session creation."
      );
    }
  }

  async validateSession(sessionId: Session["id"]) {
    try {
      const session = await admin.auth().verifySessionCookie(sessionId);

      return {
        user: {
          id: session.uid,
          userName: session.displayName,
        },
        session: {
          id: session.id,
          userId: session.uid,
          expiresAt: session.expiresAt,
        },
      };
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/session-cookie-expired":
            throw new SessionCookieExpiredError();
          case "auth/session-cookie-revoked":
            throw new SessionCookieRevokedError();
          case "auth/invalid-argument":
            throw new InvalidArgumentError();
          case "auth/internal-error":
            throw new InternalError();
          default:
            throw new AuthenticationError("Failed to validate session.");
        }
      }

      // Handle other unexpected errors
      throw new AuthenticationError(
        "An unexpected error occurred during session validation."
      );
    }
  }

  async invalidateSession(sessionCookieValue: Cookie["value"]) {
    try {
      const session = await admin
        .auth()
        .verifySessionCookie(sessionCookieValue);

      await admin.auth().revokeRefreshTokens(session.uid);

      return {
        name: SESSION_COOKIE,
        value: "",
        attributes: {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        },
      };
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/session-cookie-expired":
            throw new SessionCookieExpiredError();
          case "auth/session-cookie-revoked":
            throw new SessionCookieRevokedError();
          case "auth/invalid-argument":
            throw new InvalidArgumentError();
          case "auth/internal-error":
            throw new InternalError();
          default:
            throw new AuthenticationError("Failed to invalidate session.");
        }
      }

      // Handle other unexpected errors
      throw new AuthenticationError(
        "An unexpected error occurred during session invalidation."
      );
    }
  }

  async validateSessionCookie(sessionCookieValue: Cookie["value"]) {
    try {
      const session = await admin
        .auth()
        .verifySessionCookie(sessionCookieValue);

      return {
        id: session.id,
        userId: session.uid,
        expiresAt: session.expiresAt,
      };
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/session-cookie-expired":
            throw new SessionCookieExpiredError();
          case "auth/session-cookie-revoked":
            throw new SessionCookieRevokedError();
          case "auth/invalid-argument":
            throw new InvalidArgumentError();
          case "auth/internal-error":
            throw new InternalError();
          default:
            throw new AuthenticationError("Failed to validate session cookie.");
        }
      }

      // Handle other unexpected errors
      throw new AuthenticationError(
        "An unexpected error occurred during session cookie validation."
      );
    }
  }
}
