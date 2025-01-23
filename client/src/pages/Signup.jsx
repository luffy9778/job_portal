import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
  });
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/signup", formData);
      setMessage(response.data.message);
      (formData.name = ""),
        (formData.email = ""),
        (formData.password = ""),
        (formData.confirmPassword = ""),
        (formData.mobileNo = "");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div class="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from--800 to-blue-500 lg:h-screen p-6">
        <div class="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
          <div class="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from--300 to-orange-300 w-full h-full">
            <div class="max-w-md space-y-12 mx-auto">
              <div>
                <h4 class="text-black text-lg font-semibold">
                  Create Your Account
                </h4>
                <p class="text-[13px] text-black -200 mt-2">
                  Welcome to our registration page! Get started by creating your
                  account.
                </p>
              </div>
              <div>
                <h4 class="text-black  text-lg font-semibold">
                  Simple & Secure Registration
                </h4>
                <p class="text-[13px] text-black -200 mt-2">
                  Our registration process is designed to be straightforward and
                  secure. We prioritize your privacy and data security.
                </p>
              </div>
              <div>
                <h4 class="text-black  text-lg font-semibold">
                  Terms and Conditions Agreement
                </h4>
                <p class="text-[13px] text-black -200 mt-2">
                  Require users to accept the terms and conditions of your
                  service during registration.
                </p>
              </div>
            </div>
          </div>

          <form class="sm:p-8 p-4 w-full" onSubmit={handleSubmit}>
            <div class="md:mb-12 mb-8">
              <h3 class="text-gray-800 text-3xl font-bold">Register</h3>
            </div>

            <div class="grid lg:grid-cols-2 gap-6">
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <input
                  name="name"
                  type="text"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Last Name
                </label>
                <input
                  name="lname"
                  type="text"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input
                  name="email"
                  type="email"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Mobile No.
                </label>
                <input
                  name="mobileNo"
                  type="number"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter mobile number"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                  placeholder="Enter confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div class="flex items-center mt-6">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 shrink-0 rounded"
              />
              <label for="remember-me" class="ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  class="text-orange-500 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div class="mt-6">
              <button
                type="button"
                class="py-3 px-6 text-sm tracking-wide rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none transition-all"
              >
                Sign up
              </button>
              <p className="text-xs pt-2">
                already have an account ?
                <Link to="/login">
                  <span className="text-orange-500">Login</span>{" "}
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
