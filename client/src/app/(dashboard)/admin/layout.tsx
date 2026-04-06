"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "ADMIN") {
      router.push(`/${user?.role?.toLowerCase() || "login"}`);
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== "ADMIN") return null;

  return <>{children}</>;
}
