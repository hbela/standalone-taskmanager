import { auth } from "@repo/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Test if auth is properly initialized
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return NextResponse.json({
      success: true,
      message: "Auth is working",
      session: session ? "Session exists" : "No session",
      environment: {
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET",
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        environment: {
          BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET
            ? "SET"
            : "NOT SET",
          BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
          DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
        },
      },
      { status: 500 }
    );
  }
}
