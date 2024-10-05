"use client";

import { Path } from "@/config";
import Link from "next/link";
import { SignInForm } from "./form";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold">Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account? <Link href={Path.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
}
