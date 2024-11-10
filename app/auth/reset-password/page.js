"use client";

import { useState, useRef } from "react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import SubmitButton from "@/components/General/SubmitButton";

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    } else if (value.length === 0 && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return false;
    }
    if (formData.newPassword.length < 4) {
      toast.error("Password must be at least 4 characters long.");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp.join(""),
            newPassword: formData.newPassword,
          }),
          credentials: "include",
        }
      );
      const response = await request.json();
      if (response.success) {
        toast.success("Password has been reset successfully.");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        toast.error(response.message || "Failed to reset password.");
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
        Reset Password
      </h2>
      <form onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">OTP</label>
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                ref={(ref) => (otpRefs.current[index] = ref)}
                className="w-full p-2 border border-gray-300 rounded-lg text-center focus:ring-indigo-500 focus:border-indigo-500"
              />
            ))}
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter new password"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm new password"
            required
          />
        </div>

        <SubmitButton isLoading={isLoading} text="Reset" />
      </form>
    </div>
  );
};

export default ResetPassword;
