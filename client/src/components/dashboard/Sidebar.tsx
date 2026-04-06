import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const role = user?.role?.toLowerCase();

  const navItems = [
    { label: "Dashboard", href: `/${role}`, roles: ["VIEWER", "ANALYST", "ADMIN"] },
    { label: "Insights", href: `/${role}/insights`, roles: ["ANALYST", "ADMIN"] },
    { label: "Manage", href: `/${role}/manage`, roles: ["ADMIN"] },
  ];

  return (
    <div className="fixed left-0 top-0 hidden h-screen w-80 flex-col border-r border-black/5 p-12 lg:flex">
      <div className="flex-1">
        <nav className="mt-32 flex flex-col gap-6">
          {navItems
            .filter((i) => i.roles.includes(user?.role || ""))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xl font-semibold tracking-tight transition-all active:scale-95 ${pathname === item.href ? "text-black" : "text-slate-400 hover:text-black"
                  }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
