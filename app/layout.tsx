import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import { CompanyProvider } from "@/context/company-context";
import { UIProvider } from "@/context/ui-context";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turnity | Management System",
  description: "A human-centered internal company management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geist.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="absolute -top-40 left-0 z-50 inline-block bg-blue-600 text-white px-4 py-2 rounded focus:top-0 transition-all duration-200"
        >
          Skip to main content
        </a>
        <UIProvider>
          <AuthProvider>
            <CompanyProvider>
              {children}
            </CompanyProvider>
          </AuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}
