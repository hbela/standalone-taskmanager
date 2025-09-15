"use client";

import { createAuthClient, nextCookies } from "@repo/auth";

export const authClient = createAuthClient({
  plugins: [nextCookies()],
});
