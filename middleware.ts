import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    console.log("Token"+token);
    // 1. Logic for Admin Protection
    if (path.startsWith("/admin") && token?.role !== "admin") {
      // Redirect non-admins to home or a restricted page
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // If we reach here and authorized was true, allow the request
    return NextResponse.next();
  },
  {
    callbacks: {
      // If this returns false, the user is automatically redirected to the signIn page
      authorized: ({ token }) => !!token,
    },
    // This tells NextAuth where to send users who aren't logged in
    pages: {
      signIn: "/auth/sign-in", // Update this to match your actual sign-in path
    },
  }
);

// 2. The Matcher (Ensure these paths exist)
export const config = {
  matcher: [
    "/profile", 
    "/admin/:path*", 
    "/dashboard/:path*"
  ],
};