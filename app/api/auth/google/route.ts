import { NextResponse } from "next/server";

const API_URL = process.env.TURNITY_API_URL;

export async function GET() {
  if (!API_URL) {
    return NextResponse.redirect(new URL("/login?error=missing_api_url", "http://localhost:3000"));
  }

  return NextResponse.redirect(`${API_URL}/auth/google`);
}
