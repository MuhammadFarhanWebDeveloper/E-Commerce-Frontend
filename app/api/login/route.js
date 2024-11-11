import { cookies } from "next/headers";

export async function POST(request) {
  const formData = await request.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!res.ok) {
    return Response.json(
      { success: false, error: "Login failed" },
      { status: res.status }
    );
  }

  const data = await res.json();

  const setCookieHeader = res.headers.get("set-cookie");

  if (setCookieHeader) {
    const authToken = setCookieHeader.split(";")[0].split("=")[1];

    const cookieStore = cookies();
    cookieStore.set("authtoken", authToken, {
      sameSite: "none",

      secure: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      partitioned: true
    });
  }

  return Response.json({ success: true, user: data.user });
}
