"use server";
import { auth } from "@repo/auth";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const result = await auth.api.signInEmail({
    body: {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
  });
  if (result.data) {
    redirect("/dashboard");
  }
  return { error: "Invalid credentials" };
}
