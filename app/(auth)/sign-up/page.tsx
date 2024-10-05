"use client";

import Link from "next/link";
import SignUpForm from "./form";
import { Path } from "@/config";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <SignUpForm />
      <p>
        Already have an account? <Link href={Path.SIGN_IN}>Sign In</Link>
      </p>
    </div>
  );
}
