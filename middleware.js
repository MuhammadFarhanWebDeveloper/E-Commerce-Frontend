import { NextResponse } from "next/server";
import { getUser } from "./lib/data";
import { verifyToken } from "./lib/server-actions/auth";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const authtoken = req.cookies.get("authtoken")?.value;

  try {
    const decoded = authtoken ? await verifyToken(authtoken) : null;
    let userId = decoded?.id ? decoded.id : null;
    let sellerId = decoded?.sellerId ? decoded.sellerId : null;

    if (pathname.startsWith("/api/auth/update-user")) {
      if (!userId) {
        return NextResponse.json({ error: "Un-Authorized" }, { status: 401 });
      }

      // Clone the request headers and add `userId`
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("userId", userId);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    if (pathname.startsWith("/api/products")) {
      if (!sellerId) {
        return NextResponse.json({ error: "Un-Authorized" }, { status: 401 });
      }
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("sellerId", sellerId);
      requestHeaders.set("userId", userId);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    if (pathname.startsWith("/seller/dashboard")) {
      if (!sellerId) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
      return NextResponse.next();
    }

    if (pathname.startsWith("/auth")) {
      const isBecomeSeller = pathname.startsWith("/auth/become-seller");
      const isPasswordReset =
        pathname.startsWith("/auth/forgot-password") ||
        pathname.startsWith("/auth/reset-password");
      console.log(userId);
      if (userId) {
        if (isBecomeSeller && !sellerId) {
          return NextResponse.next();
        }

        if (isPasswordReset) {
          return NextResponse.next();
        }

        return NextResponse.rewrite(new URL("/404", req.url));
      } else {
        if (isBecomeSeller) {
          return NextResponse.rewrite(new URL("/404", req.url));
        }
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error.message, "for path:", pathname);
    return NextResponse.rewrite(new URL("/500", req.url));
  }
}

export const config = {
  matcher: ["/seller/:path*", "/auth/:path*", "/api/:path*"],
};
