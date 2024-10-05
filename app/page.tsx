import SignUpForm from "./_components/sign-up-form";
import { SignInForm } from "./_components/sign-in-form";
import IsSignedIn from "./_components/is-signed-in";

export default async function Home() {
  return (
    <div>
      <IsSignedIn />

      <h1>Please sign up or log in</h1>
      <SignUpForm />
      <h2>Sign in</h2>
      <SignInForm />
    </div>
  );
}
