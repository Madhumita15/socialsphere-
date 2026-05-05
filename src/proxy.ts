import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin" && role !== "moderator") {
      return NextResponse.redirect(new URL("/user/home", request.url));
    }
  }
  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && token) {
    if (role === "admin" || role === "moderator") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (role === "user") {
      return NextResponse.redirect(new URL("/user/home", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/user/:path*", "/admin/:path*, '/((?!api|_next/static|_next/image|favicon.ico|reels/.*).*)',"],
};
