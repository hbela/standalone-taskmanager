import { NextRequest, NextResponse } from "next/server";
import { auth } from "@repo/auth";

export async function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      // Get session from the request
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // If no session, redirect to sign in
      if (!session) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    } catch (error) {
      // If there's an error getting the session, redirect to sign in
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
