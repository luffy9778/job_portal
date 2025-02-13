
import React, { useState, useEffect, useRef } from "react";

function OtpVerification({otp,setOtp, otpSent, handleSubmit, handleSendOtp,errMsg,setErrMsg }) {
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]); // Store input refs

  useEffect(() => {
    let timer;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const handleOtpChange = (index, value) => {
    setErrMsg("")
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste=(e)=>{
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!pastedData.length) return; 

    const newOtp = pastedData.slice(0, 6).split("");

    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      newOtp.forEach((digit, i) => {
        updatedOtp[i] = digit; 
      });
      return updatedOtp;
    });

    const nextIndex = newOtp.length < 6 ? newOtp.length : 5;
    inputRefs.current[nextIndex]?.focus();
  }

  return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-96 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Enter OTP
          </h2>
          {errMsg&&<p className="text-red-500 text-center mb-6">
            {errMsg}
          </p>}
          <p className="text-gray-500 text-center mb-6">
            We've sent a 6-digit code to your email.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)} // Store ref
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 border border-gray-400 text-center text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md font-semibold"
            onClick={() => handleSubmit(otp.join(""))} 
          >
            Verify OTP
          </button>

          {/* Resend OTP Section */}
          <div className="mt-4 text-center">
            {countdown > 0 ? (
              <p className="text-gray-500">Resend OTP in {countdown}s</p>
            ) : (
              <button
                className="text-orange-500 font-semibold"
                disabled={resendDisabled}
                onClick={() => {
                  handleSendOtp()
                  setCountdown(60);
                  setResendDisabled(true);
                }}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
  );
}

export default OtpVerification;
