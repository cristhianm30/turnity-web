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
  Zap,
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
    <div className="flex min-h-screen bg-canvas dark:bg-canvas-dark">
      {/* Visual Content Section */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-sun-100 via-sun-50 to-earth-100 dark:from-canvas-dark dark:via-canvas-dark-alt dark:to-canvas-dark relative overflow-hidden">
        {/* Decorative Glass Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sun-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sun-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sun-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="z-10">
          <Link href="/login" className="flex items-center gap-2 group">
             <div className="glass-btn-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-display text-xl font-bold text-white">T</span>
             </div>
             <span className="font-display text-xl font-semibold text-gray-900 dark:text-white">Turnity</span>
          </Link>
        </div>

        <div className="z-10 max-w-lg">
          <div className="glass flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm mb-6">
            <Zap className="h-6 w-6 text-sun-500 dark:text-sun-400" />
          </div>
          <h2 className="font-display text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Start managing <span className="text-sun-500 dark:text-sun-400">smarter.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Join thousands of teams using Turnity to streamline scheduling, automate payroll, and communicate with ease.
          </p>
          
          <div className="space-y-4">
             {[
               "Instant shift notifications",
               "Automated payroll processing",
               "Unified team communication"
             ].map((feature, i) => (
               <div key={i} className="flex items-center gap-3 animate-float" style={{ animationDelay: `${i * 100}ms` }}>
                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sun-200 dark:bg-sun-500/30 text-sun-700 dark:text-sun-400">
                    <CheckCircle2 className="h-4 w-4" />
                 </div>
                 <span className="text-gray-900 dark:text-white font-medium">{feature}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="z-10">
           <p className="text-sm text-gray-600 dark:text-gray-400 opacity-60">
             © 2026 Turnity. Internal Management System.
           </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-gradient-to-br from-canvas to-canvas-alt dark:from-canvas-dark dark:to-canvas-dark-alt overflow-y-auto">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Get Started
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account in just a few steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(error || localError) && (
              <div className="rounded-xl glass backdrop-blur-md border border-red-200/50 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 p-4 flex items-start gap-3 animate-float">
                <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-400 font-medium leading-tight">
                  {error || localError}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">First Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-sun-500 transition-colors">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <Input
                    name="firstName"
                    placeholder="Juan"
                    className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-sun-400 focus:ring-sun-500/20 transition-all rounded-xl"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">Last Name</label>
                <div className="relative group">
                  <Input
                    name="lastName"
                    placeholder="Pérez"
                    className="h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-sun-400 focus:ring-sun-500/20 transition-all rounded-xl"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-sun-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-sun-400 focus:ring-sun-500/20 transition-all rounded-xl"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">Phone Number <span className="text-gray-500 dark:text-gray-500 font-normal">(Optional)</span></label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-sun-500 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-sun-400 focus:ring-sun-500/20 transition-all rounded-xl"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-sun-500 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-sun-400 focus:ring-sun-500/20 transition-all rounded-xl"
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
              className="w-full mt-2 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
              isLoading={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                Create Account
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </span>
            </Button>
          </form>

          <p className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-sun-500 dark:text-sun-400 hover:text-sun-600 dark:hover:text-sun-300 underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
