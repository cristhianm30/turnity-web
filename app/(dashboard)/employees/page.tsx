"use client";

import { useState } from "react";
import { PageHeader, PageContent } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Mail,
  Building2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types/employee";

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "María",
    lastName: "García",
    email: "maria.garcia@company.com",
    role: "Manager",
    department: "Operations",
    status: "active",
    startDate: "2021-03-15",
  },
  {
    id: "2",
    firstName: "Juan",
    lastName: "López",
    email: "juan.lopez@company.com",
    role: "Team Lead",
    department: "Operations",
    status: "active",
    startDate: "2021-07-20",
  },
  {
    id: "3",
    firstName: "Ana",
    lastName: "Martínez",
    email: "ana.martinez@company.com",
    role: "Coordinator",
    department: "HR",
    status: "on_leave",
    startDate: "2022-01-10",
  },
  {
    id: "4",
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@company.com",
    role: "Staff",
    department: "Operations",
    status: "active",
    startDate: "2022-05-03",
  },
  {
    id: "5",
    firstName: "Elena",
    lastName: "Sánchez",
    email: "elena.sanchez@company.com",
    role: "Staff",
    department: "Operations",
    status: "active",
    startDate: "2022-09-12",
  },
  {
    id: "6",
    firstName: "David",
    lastName: "Fernández",
    email: "david.fernandez@company.com",
    role: "Specialist",
    department: "IT",
    status: "active",
    startDate: "2021-11-01",
  },
];

const statusConfig = {
  active: { label: "Active", bg: "bg-[#6b8a3e]", text: "text-white" },
  on_leave: { label: "On Leave", bg: "bg-[#c87137]", text: "text-white" },
  inactive: { label: "Inactive", bg: "bg-[#c4a882]", text: "text-white" },
};

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  // Filter employees
  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      !selectedDepartment || emp.department === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  const departments = Array.from(
    new Set(mockEmployees.map((emp) => emp.department))
  ).sort();

  const activeCount = mockEmployees.filter((e) => e.status === "active").length;
  const onLeaveCount = mockEmployees.filter(
    (e) => e.status === "on_leave"
  ).length;

  return (
    <PageContent>
      <PageHeader
        title="Employees"
        subtitle="Manage your team members and their information"
      >
        <Button variant="primary" size="md">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </PageHeader>

      {/* Stats Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
         {[
           {
             label: "Total Employees",
             value: mockEmployees.length.toString(),
             icon: null,
           },
           { label: "Active", value: activeCount.toString(), icon: null },
           { label: "On Leave", value: onLeaveCount.toString(), icon: null },
           {
             label: "Departments",
             value: departments.length.toString(),
             icon: null,
           },
         ].map((stat, idx) => (
           <Card key={idx} className="flex flex-col justify-between">
             <p className="text-xs font-medium uppercase tracking-wide text-[#8b6545]">
               {stat.label}
             </p>
             <p className="mt-2 text-3xl font-bold text-[#f59e0b]">
               {stat.value}
             </p>
          </Card>
        ))}
      </div>

       {/* Search and Filter */}
       <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#c4a882] pointer-events-none" />
           <Input
             type="text"
             placeholder="Search by name, email..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             variant="filled"
             className="pl-10"
           />
         </div>

         {/* Department Filter */}
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
           <button
             onClick={() => setSelectedDepartment(null)}
             className={cn(
               "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
               !selectedDepartment
                 ? "bg-[#f59e0b] text-white"
                 : "bg-[#ede0ce] text-[#1c1207] hover:bg-[#e8d4bf]"
             )}
           >
             All
           </button>
           {departments.map((dept) => (
             <button
               key={dept}
               onClick={() => setSelectedDepartment(dept)}
               className={cn(
                 "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                 selectedDepartment === dept
                   ? "bg-[#f59e0b] text-white"
                   : "bg-[#ede0ce] text-[#1c1207] hover:bg-[#e8d4bf]"
               )}
             >
               {dept}
             </button>
           ))}
         </div>
       </div>

      {/* Employee Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => {
          const status = statusConfig[employee.status];
          const initials =
            employee.firstName.charAt(0) + employee.lastName.charAt(0);

          return (
             <Card key={employee.id} hoverable className="flex flex-col">
               {/* Avatar and Status */}
               <div className="mb-4 flex items-start justify-between">
                 <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] text-lg font-bold text-white">
                   {initials}
                 </div>
                 <span
                   className={cn(
                     "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                     status.bg,
                     status.text
                   )}
                 >
                   {status.label}
                 </span>
               </div>

               {/* Name and Role */}
               <h3 className="text-lg font-semibold text-[#1c1207]">
                 {employee.firstName} {employee.lastName}
               </h3>
               <p className="text-sm font-medium text-[#f59e0b] mb-4">
                 {employee.role}
               </p>

               {/* Info Items */}
               <div className="mb-6 space-y-3 flex-1 border-t border-[#e8dcd0] pt-4">
                 <div className="flex items-start gap-3">
                   <Building2 className="h-4 w-4 text-[#c4a882] mt-0.5 flex-shrink-0" />
                   <div className="min-w-0">
                     <p className="text-xs text-[#8b6545]">Department</p>
                     <p className="text-sm font-medium text-[#1c1207]">
                       {employee.department}
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start gap-3">
                   <Mail className="h-4 w-4 text-[#c4a882] mt-0.5 flex-shrink-0" />
                   <div className="min-w-0">
                     <p className="text-xs text-[#8b6545]">Email</p>
                     <p className="text-sm font-medium text-[#1c1207] truncate">
                       {employee.email}
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start gap-3">
                   <Clock className="h-4 w-4 text-[#c4a882] mt-0.5 flex-shrink-0" />
                   <div className="min-w-0">
                     <p className="text-xs text-[#8b6545]">Start Date</p>
                     <p className="text-sm font-medium text-[#1c1207]">
                       {new Date(employee.startDate).toLocaleDateString(
                         "en-US",
                         {
                           year: "numeric",
                           month: "short",
                           day: "numeric",
                         }
                       )}
                     </p>
                   </div>
                 </div>
               </div>

              {/* Action Button */}
              <Button variant="secondary" size="sm" className="w-full">
                View Profile
              </Button>
            </Card>
          );
        })}
      </div>

       {/* Empty State */}
       {filteredEmployees.length === 0 && (
         <div className="py-12 text-center">
           <p className="text-[#8b6545]">
             No employees found. Try adjusting your search or filters.
           </p>
         </div>
       )}
    </PageContent>
  );
}
