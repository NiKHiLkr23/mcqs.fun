import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher(["/dashboard", "/mcq", "/billing"]);
const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
export default clerkMiddleware((auth, req) => {
  if (auth().userId && isPublicRoute(req)) {
    const home = new URL("/", req.url);
    return NextResponse.redirect(home);
  }
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
