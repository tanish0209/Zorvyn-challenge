"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      login(data.user, data.token);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-sm space-y-8 p-10 border border-black/50 rounded-2xl">
        <div className="text-left">
          <h2 className="text-5xl font-semibold tracking-tight text-black">Login</h2>
          <p className="mt-4 text-slate-500">Access your account.</p>
        </div>

        {error && <div className="text-sm font-medium text-red-500">{error}</div>}

        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <input
              type="email"
              required
              className="w-full border-b border-black/10 bg-transparent py-4 text-black outline-none transition-all focus:border-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="w-full border-b border-black/10 bg-transparent py-4 text-black outline-none transition-all focus:border-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-500">
          New?{" "}
          <Link href="/signup" className="font-semibold text-black underline underline-offset-4">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
