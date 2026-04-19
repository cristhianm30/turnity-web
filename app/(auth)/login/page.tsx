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
  LogIn,
  LayoutDashboard,
  CheckCircle2
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
    <div className="flex min-h-screen bg-[#faf9f6]">
      {/* Visual Content Section */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-[#fef3c7] via-[#fffbeb] to-[#ede0ce] relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#fcd34d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#f59e0b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="z-10">
          <Link href="/" className="flex items-center gap-2 group">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#e8dcd0] transition-all group-hover:scale-110">
                <span className="font-display text-xl font-bold text-[#f59e0b]">T</span>
             </div>
             <span className="font-display text-xl font-semibold text-[#1c1207]">Turnity</span>
          </Link>
        </div>

        <div className="z-10 max-w-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-white/50 mb-6">
            <LayoutDashboard className="h-6 w-6 text-[#f59e0b]" />
          </div>
          <h2 className="font-display text-5xl font-bold text-[#1c1207] leading-tight mb-6">
            Great to see you <span className="text-[#f59e0b]">again.</span>
          </h2>
          <p className="text-xl text-[#8b6545] mb-8 leading-relaxed">
            Log in to manage your team, review shifts, and keep your operations running smoothly.
          </p>
          
          <div className="space-y-4">
             {[
               "Personalized dashboard",
               "Real-time shift updates",
               "Secure access to payroll"
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
             © 2026 Turnity. Internal Management System.
           </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-display text-3xl font-bold text-[#1c1207] mb-3">
              Welcome Back
            </h1>
            <p className="text-[#8b6545]">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545] ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8b6545]">Password</label>
                <Link href="#" className="text-xs font-bold text-[#f59e0b] hover:text-[#b45309] transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c4a882] group-focus-within:text-[#f59e0b] transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-white border-[#e8dcd0] focus:border-[#f59e0b] focus:ring-[#fcd34d] transition-all rounded-xl"
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
              className="w-full mt-2 h-12 bg-[#f59e0b] hover:bg-[#b45309] text-white shadow-md shadow-orange-200 rounded-xl"
              isLoading={isLoading}
            >
              <span className="flex items-center gap-2">
                Sign In
                <LogIn className="h-4 w-4" />
              </span>
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e8dcd0]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-[#faf9f6] text-[#8b6545]">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <GoogleSignInButton
              text="Sign in with Google"
              className="bg-white border border-[#e8dcd0] text-[#1c1207] hover:bg-gray-50"
            />
          </form>

          <div className="mt-12 text-center text-sm text-[#8b6545]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#f59e0b] hover:text-[#b45309] underline transition-colors"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
