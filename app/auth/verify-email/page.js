"use client";

import SubmitButton from "@/components/General/SubmitButton";
import { useRouter } from "nextjs-toploader/app";

import { useState } from "react";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; 

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").split("");
    if (pasteData.length === 6 && pasteData.every((char) => !isNaN(char))) {
      setOtp(pasteData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      setIsLoading(true);
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          body: JSON.stringify({ otp: otpCode }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const response = await request.json();

      if (response.success) {
        toast.success("Email verified successfully.");
        router.push("/auth/user-detail");
      } else {
        toast.error(response.message || "Sorry, Something went wrong.");
      }
    } catch (error) {
      toast.error("Sorry, Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Verify OTP
        </h2>
        <div className="text-center mb-4 text-gray-600">
          We've sent an OTP to your email. Please enter the code below to
          verify.
        </div>
        <form onSubmit={handleSubmit} onPaste={handlePaste}>
          <div className="flex justify-center items-center gap-2 mb-6  w-full">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className=" text-center p-2 w-full text-lg border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <SubmitButton isLoading={isLoading} text="Verify" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
