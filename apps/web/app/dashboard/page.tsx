import { auth } from "@repo/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return <div>Welcome, {session.user.name || session.user.email}!</div>;
}
