import axios from "axios";
import React, { useState } from "react";
import OtpVerification from "./OtpVerification";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [verifingLoading, setVerifingLoading] = useState(false);

  const navigate = useNavigate();

  const verifyEmail = async () => {
    setVerifingLoading(true);
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3500/userAuth/forgot-password",
        { email }
      );
      console.log(response.data);
      setOtpSent(true);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        setError("invalid email");
      } else setError("somthing went wrong.");
    } finally {
      setVerifingLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3500/userAuth/verify-otp",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/reset-password");
      setOtp([]);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        setError("User not found");
      } else if (error.response?.status === 422) {
        setError("Invalid OTP");
      } else {
        setError("somthing went wrong.");
      }
    }
  };

  return !otpSent ? (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-4/5 md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive a verification code.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400"
          onClick={verifyEmail}
          disabled={!email || verifingLoading}
        >
          {verifingLoading ? "sending OTP.." : "Verify Email"}
        </button>
      </div>
    </div>
  ) : (
    <OtpVerification
      errMsg={error}
      handleSendOtp={verifyEmail}
      handleSubmit={verifyOtp}
      otp={otp}
      setOtp={setOtp}
      otpSent={otpSent}
      setErrMsg={setError}
    />
  );
};

export default ForgotPassword;
