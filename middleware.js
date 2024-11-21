import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser");

  const loginPage = "/login";
  const homePage = "/";

  if (currentUser) {
    if (request.nextUrl.pathname === loginPage) {
      return NextResponse.redirect(new URL(homePage, request.url));
    }
  } else {
    if (request.nextUrl.pathname !== loginPage) {
      return NextResponse.redirect(new URL(loginPage, request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login"], // Middleware'in çalışacağı yollar
};

