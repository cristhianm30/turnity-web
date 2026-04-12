"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/employees", icon: Users, label: "Employees" },
  { href: "/shifts", icon: Calendar, label: "Shifts" },
  { href: "/payroll", icon: DollarSign, label: "Payroll" },
  { href: "/requests", icon: Clock, label: "Requests" },
  { href: "/documents", icon: FileText, label: "Documents" },
];

export function Sidebar() {
  const { isSidebarExpanded, toggleSidebar } = useUI();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-[#f5f3f0]",
        "border-r border-[#e8dcd0]",
        "flex flex-col transition-all duration-300 ease-in-out",
        isSidebarExpanded ? "w-64" : "w-20"
      )}
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-[#e8dcd0]",
          "px-4 py-6 transition-all duration-300"
        )}
      >
        {isSidebarExpanded && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f59e0b]">
              <span className="font-display text-lg font-bold text-white">T</span>
            </div>
            <span className="font-display text-lg font-semibold text-[#1c1207]">
              Turnity
            </span>
          </Link>
        )}
        {!isSidebarExpanded && (
          <Link href="/dashboard" className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-[#f59e0b]">
            <span className="font-display text-lg font-bold text-white">T</span>
          </Link>
        )}
      </div>

       {/* Navigation Items */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]",
                isActive
                  ? "border-l-2 border-[#f59e0b] bg-[#fef3c7] text-[#8b6d2e]"
                  : "text-[#7d6d5c] hover:bg-[#faf6e8]"
              )}
              aria-current={isActive ? "page" : undefined}
              title={!isSidebarExpanded ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {isSidebarExpanded && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-[#e8dcd0] px-3 py-4 space-y-2">
        {isSidebarExpanded && user && (
          <div className="flex items-center gap-3 rounded-lg bg-[#faf6e8] px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f59e0b] text-sm font-bold text-white">
              {user.firstName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1c1207] truncate">
                {user.preferredName || user.firstName}
              </p>
              <p className="text-xs text-[#7d6d5c] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]",
            "text-[#7d6d5c] hover:bg-[#f0e8df] hover:text-[#c85a54]"
          )}
          aria-label={!isSidebarExpanded ? "Logout" : undefined}
          title={!isSidebarExpanded ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {isSidebarExpanded && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <div className="border-t border-[#e8dcd0] px-3 py-4">
        <button
          onClick={toggleSidebar}
          className={cn(
            "flex w-full items-center justify-center rounded-lg bg-[#faf6e8] p-2.5 transition-all",
            "hover:bg-[#f5f0e6]",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b]"
          )}
          aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isSidebarExpanded}
        >
          {isSidebarExpanded ? (
            <ChevronLeft className="h-5 w-5 text-[#7d6d5c]" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-[#7d6d5c]" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
}
