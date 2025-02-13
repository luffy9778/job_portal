import React, { useContext, useState } from "react";
import "../../../index.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import OtpVerification from "./OtpVerification";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  //OTP handler

  const handleSendOtp = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrMsg("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setErrMsg("Please accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3500/userAuth/send-otp",
        { email: formData.email }
      );
      setOtpSent(true);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Failed to send OTP");
      console.log(error);
    }
  };

  //SignUp handler

  const handleSubmit = async (otp) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/userAuth/signUp",
        { ...formData, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setOtp("");
      setAuth({
        accessToken: response.data.accessToken,
        role: response.data.role,
      });
      // setOtpSent(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error)
      if(error.response?.status === 422){
        setErrMsg("Invalid OTP");
      }else
      setErrMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {!otpSent && (
        <>
          <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from--800 to--500 lg:h-screen p-6">
            <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
              <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from--300 to--500 w-full h-full">
                <div className="max-w-md space-y-12 mx-auto">
                  <div>
                    <h4 className="text-black text-lg font-semibold">
                      Create Your Account
                    </h4>
                    <p className="text-[13px] text-black-200 mt-2">
                      Welcome to our registration page! Get started by creating
                      your account.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-black text-lg font-semibold">
                      Simple & Secure Registration
                    </h4>
                    <p className="text-[13px] text-black-200 mt-2">
                      Our registration process is designed to be straightforward
                      and secure. We prioritize your privacy and data security.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-black text-lg font-semibold">
                      Terms and Conditions Agreement
                    </h4>
                    <p className="text-[13px] text-black-200 mt-2">
                      Require users to accept the terms and conditions of your
                      service during registration.
                    </p>
                  </div>
                </div>
              </div>

              <form className="sm:p-8 p-4 w-full">
                <div className="md:mb-12 mb-8">
                  <h3 className="text-gray-800 text-3xl font-bold">Register</h3>
                  {errMsg && (
                    <p className="text-red-500 text-sm mt-2">{errMsg}</p>
                  )}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email Id
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Mobile No.
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      maxLength="15"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9+\-()]*$/.test(value)) {
                          setFormData({ ...formData, phone: value }); // Allow only numbers and special characters
                        }
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                      placeholder="Enter confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center mt-6">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded"
                    onChange={handleTermsChange}
                  />
                  <label htmlFor="terms" className="ml-3 block text-sm">
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-orange-500 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSent}
                    className={`py-3 px-6 text-sm tracking-wide rounded-md text-white ${
                      otpSent
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-800 hover:bg-gray-900"
                    } focus:outline-none transition-all`}
                  >
                    Sign up
                  </button>
                  <p className="text-xs pt-2">
                    Already have an account?
                    <Link to="/login">
                      <span className="text-orange-500"> Login</span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
      
      {otpSent && (
        <OtpVerification
          otp={otp}
          setOtp={setOtp}
          otpSent={otpSent}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
          handleSubmit={handleSubmit}
          handleSendOtp={handleSendOtp}
        />
      )}
    </>
  );
}

export default Signup;
