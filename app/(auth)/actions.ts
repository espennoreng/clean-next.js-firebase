"use server";

import { Path, SESSION_COOKIE } from "@/config";
import { createSessionController } from "@/src/controllers/auth/create-session.controller";
import { getUserController } from "@/src/controllers/auth/get-user.controller";
import { signOutController } from "@/src/controllers/auth/sign-out.controller";
import { signUpController } from "@/src/controllers/auth/sign-up.controller";
import { Cookie } from "@/src/entities/models/cookie";
import { User } from "@/src/entities/models/user";
import { handleActionError } from "@/utils/error-handler";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp({
  request,
  pathToRevalidate,
  redirectTo,
}: {
  request: FormData;
  pathToRevalidate?: Path;
  redirectTo?: Path;
}) {
  const email = request.get("email")?.toString();
  const userName = request.get("user_name")?.toString();
  const password = request.get("password")?.toString();
  const confirmPassword = request.get("confirm_password")?.toString();

  let sessionCookie: Cookie;

  try {
    const { cookie } = await signUpController({
      email,
      userName,
      password,
      confirmPassword,
    });
    sessionCookie = cookie;
  } catch (error) {
    return handleActionError(error);
  }

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}

export async function signOut({
  pathToRevalidate,
  redirectTo,
}: {
  pathToRevalidate?: Path;
  redirectTo?: Path;
}) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);

  let blankCookie: Cookie;

  try {
    blankCookie = await signOutController(sessionCookie?.value);
  } catch (error) {
    return handleActionError(error);
  }

  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}

export async function setSessionCookie(
  idToken: string,
  userId: User["id"],
  pathToRevalidate?: Path
) {
  try {
    const { cookie } = await createSessionController(idToken, userId);

    cookies().set(cookie.name, cookie.value, cookie.attributes);

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getUser(pathToRevalidate?: Path) {
  const sessionId = cookies().get(SESSION_COOKIE)?.value;
  try {
    return await getUserController(sessionId);
  } catch (error) {
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return handleActionError(error);
  }
}
