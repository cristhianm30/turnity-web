"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCompany } from "@/context/company-context";
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
  const { company } = useCompany();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen glass-sidebar",
        "flex flex-col transition-all duration-300 ease-in-out",
        isSidebarExpanded ? "w-64" : "w-20"
      )}
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div
        className={cn(
          "flex items-center justify-between border-b border-white/20 dark:border-white/10",
          "px-4 py-6 transition-all duration-300"
        )}
      >
        {isSidebarExpanded && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="glass-btn-primary flex h-10 w-10 items-center justify-center rounded-lg shadow-lg hover:scale-105 transition-transform">
              <span className="font-display text-lg font-bold text-white">T</span>
            </div>
            <span className="font-display text-lg font-semibold text-gray-900 dark:text-white">
              Turnity
            </span>
          </Link>
        )}
        {!isSidebarExpanded && (
          <Link href="/dashboard" className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg glass-btn-primary shadow-lg hover:scale-105 transition-transform">
            <span className="font-display text-lg font-bold text-white">T</span>
          </Link>
        )}
      </div>

       {/* Navigation Items */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6 glass-scrollbar" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
           className={cn(
             "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200",
             "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
             isActive
                  ? "glass-btn-primary text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm"
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
      <div className="border-t border-white/20 dark:border-white/10 px-3 py-4 space-y-2">
        {/* Company Section */}
        <button
          onClick={() => window.location.href = "/company"}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
            "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm"
          )}
          aria-label="Switch company"
          title={company?.name || "Select company"}
        >
          {/* Company Logo Circle */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-btn-primary text-sm font-bold text-white flex-shrink-0">
            {company?.name.charAt(0).toUpperCase() || "C"}
          </div>
          {isSidebarExpanded && company && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {company.name}
              </p>
            </div>
          )}
        </button>

        {/* User Section */}
        {isSidebarExpanded && user && (
          <div className="flex items-center gap-3 rounded-lg backdrop-blur-md bg-white/40 dark:bg-white/10 px-3 py-3 border border-white/30 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full glass-btn-primary text-sm font-bold text-white">
              {user.firstName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.preferredName || user.firstName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        {!isSidebarExpanded && user && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full glass-btn-primary text-sm font-bold text-white mx-auto" title={user.preferredName || user.firstName}>
            {user.firstName.charAt(0)}
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
            "text-gray-700 dark:text-gray-300 hover:bg-red-100/50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-400"
          )}
          aria-label={!isSidebarExpanded ? "Logout" : undefined}
          title={!isSidebarExpanded ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {isSidebarExpanded && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <div className="border-t border-white/20 dark:border-white/10 px-3 py-4">
        <button
          onClick={toggleSidebar}
          className={cn(
            "flex w-full items-center justify-center rounded-lg glass-btn p-2.5 transition-all",
            "hover:bg-white/40 dark:hover:bg-white/20",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          )}
          aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isSidebarExpanded}
        >
          {isSidebarExpanded ? (
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
}
