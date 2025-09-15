"use client";
import { useState } from "react";

export default function TestSignup() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDirectAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        }),
      });

      const data = await response.json();
      setResult({
        type: "Direct API",
        response: data,
        status: response.status,
      });
    } catch (error) {
      setResult({ type: "Direct API", error: error.message });
    }
    setLoading(false);
  };

  const testAuthClient = async () => {
    setLoading(true);
    try {
      // Import authClient dynamically to avoid SSR issues
      const { authClient } = await import("@/lib/auth-client");

      const response = await authClient.signUp.email({
        body: {
          email: "test2@example.com",
          password: "password123",
          name: "Test User 2",
        },
      });

      setResult({ type: "Auth Client", response });
    } catch (error) {
      setResult({ type: "Auth Client", error: error.message, details: error });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Sign-up Test Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testDirectAPI}
          disabled={loading}
          style={{ marginRight: "10px", padding: "10px" }}
        >
          Test Direct API
        </button>

        <button
          onClick={testAuthClient}
          disabled={loading}
          style={{ padding: "10px" }}
        >
          Test Auth Client
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Result ({result.type}):</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
