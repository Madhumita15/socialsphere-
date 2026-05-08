import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const status = request.cookies.get("status")?.value;

  if (status === "blocked" && pathname !== "/banned") {
    return NextResponse.redirect(new URL("/banned", request.url));
  }
  if (status !== "blocked" && pathname === "/banned") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin" && role !== "moderator" && status !== "blocked") {
      return NextResponse.redirect(new URL("/user/home", request.url));
    }
  }
  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && token && status !== "blocked") {
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
  matcher: ["/login", "/user/:path*", "/admin/:path*", "/banned",],
};
