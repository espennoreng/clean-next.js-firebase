import { getInjection } from "@/di/container";
import { signOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { Cookie } from "@/src/entities/models/cookie";
import { User } from "@/src/entities/models/user";

export async function createSessionController(
  idToken: string | undefined,
  userId: User["id"] | undefined
) {
  const authenticationService = getInjection("IAuthenticationService");

  if (!idToken) {
    throw new Error("Must provide an idToken");
  }

  if (!userId) {
    throw new Error("Must provide an userId");
  }

  return await authenticationService.createSession(userId, idToken);
}
