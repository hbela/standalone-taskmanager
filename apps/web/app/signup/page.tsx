"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      console.log("Attempting sign-up with:", { email, password, name });

      // Prepare the sign-up data, only include name if it's not empty
      const signUpData: { email: string; password: string; name?: string } = {
        email,
        password,
      };

      if (name.trim()) {
        signUpData.name = name.trim();
      }

      const result = await authClient.signUp.email({
        body: signUpData,
      });

      console.log("Sign-up result:", result);
      if (result.data) {
        router.push("/dashboard");
      } else {
        setError("Sign-up failed");
      }
    } catch (e) {
      console.error("Sign-up error:", e);
      console.error("Error details:", {
        message: e.message,
        status: e.status,
        response: e.response,
      });
      setError(`An error occurred: ${e.message || e}`);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>}
    </div>
  );
}
