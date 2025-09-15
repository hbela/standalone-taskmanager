import { auth } from "@repo/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Add debugging for the auth handler
const handler = toNextJsHandler(auth.handler);

export const GET = async (request: Request) => {
  console.log("🔍 Auth GET request:", request.url);
  return handler.GET(request);
};

export const POST = async (request: Request) => {
  console.log("🔍 Auth POST request:", request.url);
  try {
    const body = await request.clone().text();
    console.log("🔍 Auth POST body:", body);
  } catch (e) {
    console.log("🔍 Could not read body:", e);
  }
  return handler.POST(request);
};
