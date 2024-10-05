"use client";

import { auth } from "@/utils/firebase/client-app";
import { signOut as signOutServer } from "../actions";
import { signOut as signOutClient } from "firebase/auth";
import IsSignedIn from "@/app/_components/is-signed-in";
import { Path } from "@/config";

export default function SignOutPage() {
  const handleSignOut = () => {
    signOutServer({ redirectTo: Path.SIGN_IN });
    signOutClient(auth);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white p-2 rounded-md"
      >
        Sign Out
      </button>
    </div>
  );
}
