import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Direct signup request body:", body);

    // Try to call the better-auth endpoint directly
    const response = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: {
            email: body.email,
            password: body.password,
            name: body.name,
          },
        }),
      }
    );

    const responseText = await response.text();
    console.log("Direct signup response status:", response.status);
    console.log("Direct signup response body:", responseText);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      response: responseText,
    });
  } catch (error) {
    console.error("Direct signup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
