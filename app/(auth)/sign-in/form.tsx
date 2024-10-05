"use client";

import { auth } from "@/utils/firebase/client-app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setSessionCookie } from "../actions";
import { useState } from "react";
import { Path } from "@/config";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export function SignInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await setSessionCookie(await user.getIdToken(), user.uid);
      router.push(Path.SIGN_OUT);
    } catch (error: any) {
      console.log(error);
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setErrorMessage("Invalid credentials");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black">
      {errorMessage && <p className="error text-red-500">{errorMessage}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-2 rounded-md"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-2 rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Sign In
      </button>
    </form>
  );
}
