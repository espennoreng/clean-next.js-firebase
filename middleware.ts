// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { admin } from "@/utils/firebase/admin";
import { SESSION_COOKIE } from "./config";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await admin.auth().verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // TODO: add protected routes
  matcher: ["/protected-route", "/another-protected-route"],
};
