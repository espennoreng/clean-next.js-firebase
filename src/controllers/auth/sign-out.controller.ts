import { getInjection } from "@/di/container";
import { signOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { Cookie } from "@/src/entities/models/cookie";

export async function signOutController(
  sessionCookieValue: Cookie["value"] | undefined
) {
  const authenticationService = getInjection("IAuthenticationService");

  if (!sessionCookieValue) {
    throw new Error("Must provide a session cookie");
  }

  await authenticationService.validateSessionCookie(sessionCookieValue);

  return await signOutUseCase(sessionCookieValue);
}
