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
  ArrowRight
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-canvas to-canvas-alt dark:from-canvas-dark dark:to-canvas-dark-alt overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Glass Backdrop Overlay */}
      <div className="absolute inset-0 glass backdrop-blur-xl bg-black/20 dark:bg-black/40 z-0" />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto px-6 max-h-[90vh] overflow-y-auto">
        <div className="glass-card rounded-3xl p-8 shadow-2xl dark:shadow-2xl/40">
          {/* Header with gradient */}
          <div className="mb-8 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 mb-6 group">
              <div className="glass-btn-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-white">T</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Get Started
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account in just a few steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <Input
                    name="firstName"
                    placeholder="Juan"
                    className="pl-10 h-11 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-lg text-sm"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  placeholder="Pérez"
                  className="h-11 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-lg text-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-11 h-11 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-lg text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                Phone <span className="text-gray-500 dark:text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="pl-11 h-11 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-lg text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-11 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-lg text-sm"
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
              className="w-full h-11 rounded-lg shadow-lg hover:shadow-xl transition-all mt-6"
              isLoading={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                Create Account
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </span>
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 underline transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
