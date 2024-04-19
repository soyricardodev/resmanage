import { NextResponse } from "next/server";
import {
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  return NextResponse.next();
});

export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
