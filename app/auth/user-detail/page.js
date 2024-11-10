"use client";

import SubmitButton from "@/components/General/SubmitButton";
import { addUser } from "@/lib/redux/slices/user";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UserInfoForm = () => {
  const router = useRouter();
  const dispetch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields = () => {
    if (formData.firstName.length < 4 || formData.firstName.length > 20) {
      toast.error("First Name must be between 4 to 20 characters.");
      return false;
    }
    if (formData.lastName.length < 4 || formData.lastName.length > 20) {
      toast.error("Last Name must be between 4 to 20 characters.");
      return false;
    }
    if (formData.password.length < 4) {
      toast.error("Password must be at least 4 characters long.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      setIsLoading(true);
      const request = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        }),
        credentials: "include",
      });
      const response = await request.json();

      if (response.success) {
        toast.success("Registration successful!");
        dispetch(addUser(response.user));
        router.push("/");
      } else {
        toast.error(
          response.message || "Failed to register. Please try again."
        );
      }
    } catch (error) {
      toast.error("Sorry, something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        User Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm your password"
            required
          />
        </div>

        <SubmitButton isLoading={isLoading} text="Submit" />
      </form>
    </div>
  );
};

export default UserInfoForm;
