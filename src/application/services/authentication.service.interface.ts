import { BlankCookie, Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

export interface IAuthenticationService {
  createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ idToken: string; userId: string }>;
  createSession(
    userId: User["id"],
    idToken: string
  ): Promise<{ session: Session; cookie: Cookie }>;
  validateSession(
    sessionId: Session["id"]
  ): Promise<{ user: User; session: Session }>;
  validateSessionCookie(sessionCookieValue: Cookie["value"]): Promise<Session>;
  invalidateSession(sessionCookieValue: Cookie["value"]): Promise<BlankCookie>;
  findUserByEmail(email: string): Promise<User["id"] | null>;
}
