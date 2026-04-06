"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-xl">
      <Link href="/" className="text-2xl font-light">
        ZORVYN Challenge
      </Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="hidden sm:inline-block px-4 py-1.5 text-xs font-semibold rounded-full border border-white/20 bg-white/5">
              {user.name} ({user.role})
            </span>
            <button
              onClick={logout}
              className="px-6 py-2 text-sm font-semibold transition-all rounded-lg border border-white/10 hover:bg-white/10 active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-6 py-2 text-sm font-semibold">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 text-sm font-semibold">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
