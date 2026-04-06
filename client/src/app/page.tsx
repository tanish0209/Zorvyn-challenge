"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(`/${user.role.toLowerCase()}`);
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;

  return (
    <div className="relative overflow-hidden pt-32 pb-48 px-10 text-center">
      <h1 className="mx-auto max-w-4xl text-7xl font-semibold">
        Zorvyn Backend Assignment
      </h1>
      <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Link
          href="/signup"
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-black text-white px-10 text-lg font-semibold sm:w-auto"
        >
          SignUp
        </Link>
        <Link
          href="/login"
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-black text-white px-10 text-lg font-semibold sm:w-auto"
        >
          Login        </Link>
      </div>

    </div>
  );
}
