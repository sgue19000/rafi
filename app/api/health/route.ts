import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    product: "termline",
    mode: process.env.DATABASE_URL ? "postgres" : "local",
  });
}
