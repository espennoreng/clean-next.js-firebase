"use client";

import { useState } from "react";
import { signUp } from "../(auth)/actions";
import { Path } from "@/config";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await signUp({ request: formData, redirectTo: Path.SIGN_OUT });
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      {/* Your form fields */}
      <input type="email" name="email" required placeholder="Email" />
      <input type="text" name="user_name" required placeholder="Username" />
      <input type="password" name="password" required placeholder="Password" />
      <input
        type="password"
        name="confirm_password"
        required
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
}
