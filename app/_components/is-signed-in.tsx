"use server";

import { getUser } from "../(auth)/actions";

export default async function IsSignedIn() {
  const res = await getUser();

  if (!res) {
    return <p>The user is not logged in</p>;
  }

  if ("error" in res) {
    return <p>The user is not logged in</p>;
  }

  const { userName } = res;

  return <p>The user is logged in: {userName}</p>;
}
