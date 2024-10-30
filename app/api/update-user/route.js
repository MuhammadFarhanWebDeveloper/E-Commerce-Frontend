import { cookies } from "next/headers";
import { NextResponse } from "next/server";  // Import NextResponse

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const cookieStore = cookies();
    const authToken = cookieStore.get("authtoken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-user`,
      {
        method: "PUT",
        body: formData,
        headers: {
          authtoken: authToken,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Can't update your info" },
        { status: res.status }
      );
    }

    const newUser = await res.json();

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}