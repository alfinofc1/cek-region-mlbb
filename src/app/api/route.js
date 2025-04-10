import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { message: "403. Forbidden!" },
    { status: 403 }
  );
}