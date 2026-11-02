"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, Field, SubmitButton } from "@/components/auth-shell";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await authClient.signUp.email({ name, email, password });

    if (data?.token) {
      alert("Sign up successful! Please check your email to verify your account.");

      fetch(`http://localhost:5000/api/send-email?email=${email}&name=${name}`, {
        method: "POST"
    });
    }

    setLoading(false);
    if (error) {
      alert(error.message ?? "Could not create your account. Try again.");
      setError(error.message ?? "Could not create your account. Try again.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-cobalt underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Full name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
    </AuthShell>
  );
}