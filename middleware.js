import { NextResponse } from "next/server";
import { verifyToken } from "./lib/tokenUtils";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      try {
        const { verified } = verifyToken(token);
        if (!verified) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
