import { NextResponse } from "next/server";
import { getUser } from "./lib/apiCalls/user";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const authtoken = req.cookies.get("authtoken")?.value;

  try {
    const user = authtoken ? await getUser(authtoken) : null;

    // Create the default response
    const res = NextResponse.next();



    // Handle /seller routes
    if (pathname.startsWith("/seller/dashboard")) {
      if (!user?.user?.isSeller) {
        console.log("user is not defined")
        console.log(user)
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      return res;
    }

    // Handle /auth routes
    if (pathname.startsWith("/auth")) {
      const isBecomeSeller = pathname.startsWith("/auth/become-seller");
      const isPasswordReset =
        pathname.startsWith("/auth/forgot-password") ||
        pathname.startsWith("/auth/reset-password");

      if (user?.user) {
        // Allow become-seller for logged-in non-sellers
        if (isBecomeSeller && !user.user.isSeller) {
          return res;
        }
        // Allow password reset routes
        if (isPasswordReset) {
          return res;
        }
        // Redirect other auth routes for logged-in users
        return NextResponse.rewrite(new URL("/404", req.url));
      } else {
        if (isBecomeSeller) {
          return NextResponse.rewrite(new URL("/404", req.url));
        }
        return res;
      }
    }

    // Default response for non-matching routes
    return res;
  } catch (error) {
    console.error("Middleware Error:", error.message, "for path:", pathname);
    return NextResponse.rewrite(new URL("/500", req.url));
  }
}

export const config = {
  matcher: ["/seller/:path*", "/auth/:path*"],
};
