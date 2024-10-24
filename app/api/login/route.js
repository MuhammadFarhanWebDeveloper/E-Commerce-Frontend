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
    return Response.json({ error: "Login failed" }, { status: res.status });
  }

  
  const data = await res.json();

  
  const authToken = res.headers.get("set-cookie");
  console.log(authToken)

  if (authToken) {
    
    const cookieStore = cookies();
    cookieStore.set("authtoken", authToken, {
      httpOnly: true,  
      sameSite: "strict", 
      secure: process.env.NODE_ENV === "production", 
      path: "/", 
    });
  }

  
  return Response.json({ data });
}
