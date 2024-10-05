import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";
import { injectable } from "inversify";

@injectable()
export class AuthenticationServiceMock implements IAuthenticationService {
  private _sessions: Record<string, { user: User; session: Session }> = {};

  constructor() {
    this._sessions = {};
  }

  async createUser({ email, password }: { email: string; password: string }) {
    return { idToken: "idToken", userId: "userId" };
  }

  async createSession(userId: User["id"], idToken: string) {
    return {
      session: {
        id: "sessionId",
        userId: "userId",
        expiresAt: new Date(),
      },
      cookie: {
        name: "cookieName",
        value: "cookieValue",
        attributes: {
          path: "/",
          httpOnly: true,
          secure: true,
        },
      },
    };
  }

  async findUserByEmail(email: string) {
    return "userId";
  }

  async validateSession(sessionId: Session["id"]) {
    return {
      user: {
        id: "userId",
        userName: "userName",
      },
      session: {
        id: "sessionId",
        userId: "userId",
        expiresAt: new Date(),
      },
    };
  }

  async validateSessionCookie(sessionCookieValue: Cookie["value"]) {
    return {
      id: "sessionId",
      userId: "userId",
      expiresAt: new Date(),
    };
  }

  async invalidateSession(sessionCookieValue: Cookie["value"]) {
    return {
      name: "cookieName",
      value: "",
      attributes: {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    };
  }
}
