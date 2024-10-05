"use client";

import { auth } from "@/utils/firebase/client-app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setSessionCookie } from "../(auth)/actions";

export function SignInForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return;
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    setSessionCookie(await user.getIdToken(), user.uid);
  };

  return (
    <form onSubmit={handleSubmit} className="text-black bg-white p-4">
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Password" />
      <button type="submit" className="text-red-500">
        Sign In
      </button>
    </form>
  );
}
