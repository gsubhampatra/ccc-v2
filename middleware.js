import { NextResponse } from "next/server";
import { clubAdmins } from "./data/clubMembers";
export async function middleware(request) {
  const token = request.cookies.get("ccc-token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      const isAdmin = clubAdmins.find((admin) => admin.email === token);
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
