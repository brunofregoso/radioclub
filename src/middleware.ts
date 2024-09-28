// src/middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// This is the middleware function
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Get the session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Allow requests to the login page without a session
    const isLoginPage = req.nextUrl.pathname === "/login";

    // Log session for debugging
    console.log("Session data:", session);

    // If there is no session and the request is not to the login page, redirect to the home page
    if (!session && !isLoginPage) {
        console.log("No session found. Redirecting to home."); // Log for debugging
        return NextResponse.redirect(new URL("/", req.url)); // Change to redirect to login page
    }

    return res;
}

// This matcher applies to all routes except API routes and static files
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], 
};
