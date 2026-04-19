"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  ArrowRight
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      await login({ email, password });
      router.refresh();
      setTimeout(() => {
        router.push("/company");
      }, 200);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-canvas to-canvas-alt dark:from-canvas-dark dark:to-canvas-dark-alt overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Glass Backdrop Overlay */}
      <div className="absolute inset-0 glass backdrop-blur-xl bg-black/20 dark:bg-black/40 z-0" />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-[450px] mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 shadow-2xl dark:shadow-2xl/40">
          {/* Header with gradient */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="glass-btn-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-xl font-bold text-white">T</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account to continue.
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">
                Work Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 glass dark:bg-white/5 border-white/30 dark:border-white/10 focus:border-brand-400 focus:ring-brand-500/20 transition-all rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
              isLoading={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                Sign In
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </span>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white/80 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <GoogleSignInButton
              text="Sign in with Google"
              className="glass dark:glass border-white/30 dark:border-white/10 text-gray-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/15 w-full"
            />
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 underline transition-colors"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
