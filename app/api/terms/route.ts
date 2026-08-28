import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    error: "local_mode",
    message: "This deployment is running without DATABASE_URL. Use the browser store, or set Postgres using docs/DATABASE.md.",
  }, { status: 501 });
}

export function POST() {
  return NextResponse.json({
    error: "local_mode",
    message: "Server writes require DATABASE_URL.",
  }, { status: 501 });
}
