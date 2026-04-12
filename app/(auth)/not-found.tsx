import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#faf9f6]">
      <div className="w-full max-w-md rounded-lg border border-[#e8dcd0] bg-white p-8 text-center">
        <div className="mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-[#f59e0b]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1c1207] mb-2">404</h1>
          <p className="text-[#7d6d5c]">Page not found</p>
        </div>

        <p className="text-sm text-[#8b6545] mb-6">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/login">
            <Button className="w-full">Go to login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
