"use client";
import { useRouter } from 'nextjs-toploader/app';

import { useState } from "react";

const SendOtp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/send-otp`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const response = await request.json();
      if (response.success ) {
        router.push("/auth/verify-email")
      }
      console.log(response);
    } catch (error) {
      setError("Sorry Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="border bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Enter Your Email
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center hover:bg-indigo-700 transition duration-300"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Send OTP"
          ) : (
            <img src="/loading.gif" className="mx-auto" />
          )}
        </button>
      </form>
    </div>
  );
};

export default SendOtp;
