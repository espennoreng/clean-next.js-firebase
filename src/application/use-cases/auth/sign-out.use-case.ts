import { getInjection } from "@/di/container";
import { BlankCookie, Cookie } from "@/src/entities/models/cookie";

export async function signOutUseCase(
  sessionCookieValue: Cookie["value"]
): Promise<BlankCookie> {
  const authenticationService = getInjection("IAuthenticationService");
  return await authenticationService.invalidateSession(sessionCookieValue);
}
