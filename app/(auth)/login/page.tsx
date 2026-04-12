"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
      // Refresh router to ensure server-side check of cookie
      router.refresh();
      // Then navigate to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 200);
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-canvas">
      {/* Left Panel — Illustration */}
      <div className="hidden w-3/5 bg-gradient-to-br from-[#fffbf0] via-[#fef3c7] to-[#ede0ce] lg:flex lg:items-center lg:justify-center">
        <div className="relative h-full w-full">
          {/* SVG Illustration */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full opacity-90"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Illustration petals */}
            <circle cx="200" cy="200" r="120" fill="#FCD34D" opacity="0.8" />
            <circle cx="200" cy="200" r="100" fill="#F59E0B" opacity="0.7" />

            {/* Petals - using overlapping circles */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 140;
              const y = 200 + Math.sin(rad) * 140;
              const hue = 30 + angle * 0.5;
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="35"
                  ry="65"
                  fill={`hsl(${hue}, 90%, 55%)`}
                  opacity="0.85"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}

            {/* Center disk */}
            <circle cx="200" cy="200" r="40" fill="#B45309" opacity="0.9" />

            {/* Decorative seed pattern */}
            {[...Array(20)].map((_, i) => {
              const angle = (i * 360) / 20;
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 20;
              const y = 200 + Math.sin(rad) * 20;
              return (
                <circle
                  key={`seed-${i}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#8B4513"
                  opacity="0.6"
                />
              );
            })}

            {/* Stem */}
            <line
              x1="200"
              y1="320"
              x2="200"
              y2="400"
              stroke="#6B5E52"
              strokeWidth="8"
              opacity="0.7"
            />

            {/* Leaves */}
            <ellipse
              cx="150"
              cy="340"
              rx="25"
              ry="50"
              fill="#C47B15"
              opacity="0.6"
              transform="rotate(-30 150 340)"
            />
            <ellipse
              cx="250"
              cy="360"
              rx="25"
              ry="50"
              fill="#C47B15"
              opacity="0.6"
              transform="rotate(30 250 360)"
            />
          </svg>

           {/* Bottom text accent */}
           <div className="absolute inset-x-0 bottom-12 text-center">
             <p className="font-display text-2xl font-semibold text-[#1c1207] opacity-70">
               Every team deserves to flourish
             </p>
           </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-2/5 lg:px-8">
         <div className="w-full max-w-sm">
           {/* Brand Wordmark */}
           <div className="mb-12 text-center">
             <h1 className="font-display text-4xl font-semibold text-[#1c1207]">
               Turnity
             </h1>
             <p className="mt-2 text-sm text-[#8b6545]">
               Internal Management System
             </p>
           </div>

           {/* Welcome text */}
           <p className="mb-8 text-sm font-medium uppercase tracking-wide text-[#8b6545]">
             Welcome back
           </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {(error || localError) && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-700 font-medium">
                  {error || localError}
                </p>
              </div>
            )}

            {/* Email Input */}
            <Input
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
              autoComplete="email"
              required
            />

            {/* Password Input */}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
              autoComplete="current-password"
              required
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>

           {/* Forgot Password Link */}
           <div className="mt-6 text-center">
             <Link
               href="#"
               className="text-sm text-[#8b6545] transition-colors hover:text-[#f59e0b]"
             >
               Forgot password?
             </Link>
           </div>

           {/* Demo Note */}
           <div className="mt-12 border-t border-[#e8dcd0] pt-6">
             <p className="text-xs text-[#c4a882]">
               Demo: Use any email and password to log in.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
