"use client";

import SubmitButton from "@/components/General/SubmitButton";
import { addUser } from "@/lib/redux/slices/user";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();
  const dispetch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const response = await request.json();

      if (response.success) {
        toast.success("Welcome back! You've successfully logged in");
        dispetch(addUser(response.user));
        router.push("/");
      } else {
        toast.error(
          response.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
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
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <SubmitButton isLoading={isLoading} text="Login" />

        <div className="mt-4 text-center">
          <Link
            href={"/auth/forgot-password"}
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
