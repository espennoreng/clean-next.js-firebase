import { getInjection } from "@/di/container";
import { User } from "@/src/entities/models/user";

function presenter(user: User) {
  return {
    id: user.id,
    userName: user.userName,
  };
}

export async function getUserController(
  sessionId: string | undefined
): Promise<User | null> {
  const authenticationService = getInjection("IAuthenticationService");
  const userService = getInjection("IUserRepository");

  if (!sessionId) {
    return null;
  }

  const { session } = await authenticationService.validateSession(sessionId);

  const user = await userService.getUserById(session.userId);

  if (user) {
    return presenter(user);
  }

  throw new Error("No user found");
}
