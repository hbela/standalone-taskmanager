import { auth } from "@repo/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Test signup endpoint - use POST with email, password, name",
    method: "POST",
    example: {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Test signup request body:", body);

    // Try to create a user directly using the auth system
    const result = await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    return NextResponse.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error("Test signup error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        name: error.name,
      },
      { status: 400 }
    );
  }
}
