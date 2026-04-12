"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    preferredName: "",
  });
  
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    try {
      await register(formData);
      router.refresh();
      setTimeout(() => {
        router.push("/dashboard");
      }, 200);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      {/* Visual Content Section */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-[#fef3c7] via-[#fffbeb] to-[#ede0ce] relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#fcd34d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#f59e0b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="z-10">
          <Link href="/login" className="flex items-center gap-2 group">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#e8dcd0] transition-all group-hover:scale-110">
                <span className="font-display text-xl font-bold text-[#f59e0b]">T</span>
             </div>
             <span className="font-display text-xl font-semibold text-[#1c1207]">Turnity</span>
          </Link>
        </div>

        <div className="z-10 max-w-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-white/50 mb-6">
            <Sparkles className="h-6 w-6 text-[#f59e0b]" />
          </div>
          <h2 className="font-display text-5xl font-bold text-[#1c1207] leading-tight mb-6">
            Empower your <span className="text-[#f59e0b]">workforce</span> management.
          </h2>
          <p className="text-xl text-[#8b6545] mb-8 leading-relaxed">
            The all-in-one platform for shifts, payroll, and team coordination. Designed for teams that grow.
          </p>
          
          <div className="space-y-4">
             {[
               "Smart shift scheduling",
               "Automated payroll calculation",
               "Direct communication tools"
             ].map((feature, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fde68a] text-[#b45309]">
                    <CheckCircle2 className="h-4 w-4" />
                 </div>
                 <span className="text-[#1c1207] font-medium">{feature}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="z-10">
           <p className="text-sm text-[#8b6545] opacity-60">
             © 2026 Turnity. All rights reserved.
           </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-display text-3xl font-bold text-[#1c1207] mb-3">
              Get Started
            </h1>
            <p className="text-[#8b6545]">
              Create your account to manage your team effectively.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {(error || localError) && (
              <div className="rounded-2xl bg-red-50 p-4 border border-red-100 flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-red-700 font-medium leading-tight">
                  {error || localError}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">First Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <Input
                    name="firstName"
                    placeholder="Juan"
                    className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Last Name</label>
                <div className="relative group">
                  <Input
                    name="lastName"
                    placeholder="Pérez"
                    className="h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Preferred Name</label>
              <Input
                name="preferredName"
                placeholder="Juanito"
                className="h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                value={formData.preferredName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="juan.perez@empresa.com"
                  className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  name="phone"
                  placeholder="310 123 4567"
                  className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4 h-12 bg-[#f59e0b] hover:bg-[#b45309] text-white shadow-md shadow-orange-200"
              isLoading={isLoading}
            >
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-[#8b6545]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#f59e0b] hover:text-[#b45309] underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
