import { useState } from "react";
import { Path } from "@/config";
import { InvalidEmailError } from "@/src/entities/errors/invalid-email.error";
import { InvalidPasswordError } from "@/src/entities/errors/invalid-password.error";
import { NetworkError } from "@/src/entities/errors/network.error";
import { TooManyRequestsError } from "@/src/entities/errors/to-many-requests.error";
import { UserDisabledError } from "@/src/entities/errors/user-disabled.error";
import { UserNotFoundError } from "@/src/entities/errors/user-not-found.error";
import { signUp } from "../actions";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await signUp({ request: formData, redirectTo: Path.SIGN_OUT });
    } catch (error: any) {
      console.log(error);
      if (error instanceof InvalidPasswordError) {
        setErrorMessage("Invalid password");
      } else if (error instanceof InvalidEmailError) {
        setErrorMessage("Invalid email");
      } else if (error instanceof UserDisabledError) {
        setErrorMessage("User disabled");
      } else if (error instanceof UserNotFoundError) {
        setErrorMessage("User not found");
      } else if (error instanceof TooManyRequestsError) {
        setErrorMessage("Too many requests. Please try again later.");
      } else if (error instanceof NetworkError) {
        setErrorMessage("Network error. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-black">
      {errorMessage && <p className="error text-red-500">{errorMessage}</p>}
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="p-2 rounded-md"
      />
      <input
        type="text"
        name="user_name"
        required
        placeholder="Username"
        className="p-2 rounded-md"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="p-2 rounded-md"
      />
      <input
        type="password"
        name="confirm_password"
        required
        placeholder="Confirm Password"
        className="p-2 rounded-md"
      />
      <button type="submit" className="p-2 rounded-md bg-blue-500 text-white">
        Sign Up
      </button>
    </form>
  );
}
