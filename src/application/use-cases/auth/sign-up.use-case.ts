import { getInjection } from "@/di/container";
import { EmailAlreadyExistsError } from "@/src/entities/errors/email-already-exists.error";
import { Cookie } from "@/src/entities/models/cookie";
import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

export async function signUpUseCase(input: {
  email: string;
  userName: string;
  password: string;
}): Promise<{
  session: Session;
  cookie: Cookie;
  user: Pick<User, "id" | "userName">;
}> {
  const authenticationService = getInjection("IAuthenticationService");
  const userRepository = getInjection("IUserRepository");

  const existingUserId = await authenticationService.findUserByEmail(
    input.email
  );

  if (existingUserId) {
    throw new EmailAlreadyExistsError();
  }

  const { idToken, userId } = await authenticationService.createUser({
    email: input.email,
    password: input.password,
  });

  const user = await userRepository.createUser({
    id: userId,
    userName: input.userName,
  });

  const { cookie, session } = await authenticationService.createSession(
    userId,
    idToken
  );

  return {
    cookie,
    session,
    user,
  };
}
