import "server-only";
import { cookies } from "next/headers";
import { admin } from "@/utils/firebase/admin";

export async function getAuthenticatedAppForUser() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    throw new Error("User is not authenticated");
  }

  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);

    return { userId: decodedClaims.uid };
  } catch (error) {
    console.error("Error verifying session cookie:", (error as Error).message);
    console.log("Session cookie:", sessionCookie);
    throw new Error("Invalid or expired session");
  }
}
