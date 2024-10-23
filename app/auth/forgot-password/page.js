"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );
      const response = await request.json();
      if (response.success) {
        setSuccess("Please check your email for the OTP.");
        setTimeout(() => router.push("/auth/reset-password"), 1500);
      } else {
        setError(response.message || "Something went wrong");
      }
    } catch (error) {
      setError("Sorry, something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center hover:bg-indigo-700 transition duration-300"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Send Reset Token"
          ) : (
            <img src="/loading.gif" className="mx-auto" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
