import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const condition =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";

  if (user && condition) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/vote";
    return NextResponse.redirect(redirectUrl);
  } else if (!user && !condition) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/vote", "/login", "/register", "/result"],
};
