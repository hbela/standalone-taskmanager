import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  fetchOptions: {
    onError: (ctx) => {
      console.error("Auth client error:", ctx.error);
      console.error("Auth client error context:", ctx);
    },
  },
});
