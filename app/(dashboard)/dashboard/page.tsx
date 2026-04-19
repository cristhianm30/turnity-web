"use client";

import { useAuth } from "@/context/auth-context";
import { useCompany } from "@/context/company-context";
import { useRouter } from "next/navigation";
import { PageContent } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { company } = useCompany();
  const firstName = user?.firstName || "there";

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <PageContent>
      {/* TOP SECTION: Greeting & Context */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="font-display text-4xl font-semibold text-[#1c1207]">
              {greeting()}, {firstName}.
            </h1>
            <p className="mt-2 text-[#8b6545]">
              {todayDate} • 3 pending approvals • 12 shifts today
            </p>
          </div>
          {company && (
            <div className="flex items-center gap-3 bg-[#fef3c7] rounded-lg px-4 py-3 w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fcd34d]">
                <Building2 className="h-5 w-5 text-[#b45309]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#b45309] uppercase">Company</p>
                <p className="text-sm font-semibold text-[#1c1207]">{company.name}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/company")}
                className="ml-2"
              >
                Switch
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* KEY METRICS ROW */}
      <div className="mb-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Employees",
            value: "47",
            icon: Users,
            color: "sun",
          },
          {
            label: "Active Today",
            value: "42",
            icon: TrendingUp,
            color: "earth",
          },
          {
            label: "On Leave",
            value: "5",
            icon: Clock,
            color: "sun",
          },
          {
            label: "Pending Approvals",
            value: "3",
            icon: CheckCircle2,
            color: "earth",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          const bgColor =
            stat.color === "sun" ? "bg-[#fef3c7]" : "bg-[#ede0ce]";
          const textColor =
            stat.color === "sun" ? "text-[#b45309]" : "text-[#8b6545]";

          return (
            <Card key={idx} className="flex flex-col gap-3">
              <div className={`${bgColor} rounded-lg p-3 w-fit`}>
                <Icon className={`h-6 w-6 ${textColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#8b6545] uppercase">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-[#1c1207] mt-1">
                  {stat.value}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* MIDDLE SECTION: Operations (2-Column Balanced) */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        {/* Left: Today's Shifts */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[#1c1207]">
              Today&apos;s Shifts
            </h2>
            <Link
              href="/shifts"
              className="flex items-center gap-2 text-[#f59e0b] hover:text-[#b45309] font-medium text-sm"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Shift Timeline */}
          <div className="space-y-4">
            {[
              { time: "8:00 AM - 4:00 PM", team: "Morning Crew", count: 8 },
              { time: "2:00 PM - 10:00 PM", team: "Afternoon Team", count: 6 },
              { time: "10:00 PM - 6:00 AM", team: "Night Watch", count: 3 },
            ].map((shift, idx) => (
              <Card
                key={idx}
                hoverable
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#fef3c7]">
                    <Calendar className="h-6 w-6 text-[#b45309]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1c1207]">{shift.time}</p>
                    <p className="text-sm text-[#8b6545]">{shift.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#f59e0b]">
                      {shift.count}
                    </p>
                    <p className="text-xs text-[#c4a882]">People</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Pending Requests */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[#1c1207]">
              Pending Requests
            </h2>
            <span className="inline-flex items-center justify-center rounded-full bg-[#f59e0b] h-6 w-6 text-xs font-bold text-white">
              3
            </span>
          </div>
          <div className="space-y-4">
            {[
              "Leave Request - Juan López",
              "Shift Swap - Ana Martínez",
              "Document Upload - Carlos R.",
            ].map((req, idx) => (
              <Card key={idx} hoverable className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ede0ce] flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-[#8b6545]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1c1207]">{req}</p>
                  <p className="text-xs text-[#8b6545] mt-1">Awaiting approval</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Activity & Secondary Info */}
      <div className="mb-12 grid gap-8 lg:grid-cols-3">
        {/* Team at a Glance */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 font-display text-2xl font-semibold text-[#1c1207]">
            Team at a Glance
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[
              { name: "María García", role: "Manager", initial: "M" },
              { name: "Juan López", role: "Team Lead", initial: "J" },
              { name: "Ana Martínez", role: "Coordinator", initial: "A" },
              { name: "Carlos Rodríguez", role: "Staff", initial: "C" },
              { name: "Elena Sánchez", role: "Staff", initial: "E" },
            ].map((person, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] text-sm font-bold text-white">
                  {person.initial}
                </div>
                <p className="text-xs font-medium text-center text-[#1c1207] max-w-[70px]">
                  {person.name.split(" ")[0]}
                </p>
                <p className="text-xs text-[#8b6545]">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Documents & Payroll */}
        <div className="space-y-6">
          {/* Recent Documents */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-[#1c1207]">
              Recent Documents
            </h2>
            <Card hoverable className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#f59e0b] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1c1207] truncate">
                  Q4 Budget Report
                </p>
                <p className="text-xs text-[#c4a882]">2 days ago</p>
              </div>
            </Card>
          </div>

          {/* Payroll Info */}
          <Card className="border-[#fef3c7] bg-[#fffbf0]">
            <p className="text-xs font-medium uppercase text-[#b45309]">
              Next Payroll
            </p>
            <p className="mt-2 text-2xl font-bold text-[#1c1207]">
              March 15
            </p>
            <p className="mt-1 text-xs text-[#8b6545]">
              47 employees • 127 hours total
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-lg border border-[#e8dcd0] bg-gradient-to-r from-[#fffbf0] to-[#fef3c7] p-8">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl font-semibold text-[#1c1207]">
            Need to add a new employee?
          </h3>
          <p className="mt-2 text-[#8b6545]">
            Keep your team directory up to date with the latest staff additions.
          </p>
          <Button variant="primary" size="md" className="mt-4">
            Add Employee
          </Button>
        </div>
      </div>
    </PageContent>
  );
}
