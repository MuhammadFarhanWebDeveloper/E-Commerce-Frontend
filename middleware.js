import { NextResponse } from "next/server";
import { getUser } from "./lib/apiCalls/user";
import { notFound } from "next/navigation";

export async function middleware(req) {
  try {
    if (req.nextUrl.pathname == "/seller/dashboard") {
      const authtoken = req.cookies.get("authtoken")?.value;
      const user = await getUser(authtoken);
      if (!user?.user.isSeller) {
        return notFound()
      }

      const res = NextResponse.next();
      res.headers.set('user', JSON.stringify(user.user));
      return res;
    }
    
    return NextResponse.next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
  }
}
