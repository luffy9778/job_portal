import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbaruser from "../../components/Navbaruser";
import Footer from "../../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // No arguments needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call
      const response = await axios.post("http://localhost:3500/userAuth/login", {
        email,
        password,
      });

      const data = response.data; // Directly access response data

      if (response.status === 200) {
        // Store token in local storage
        localStorage.setItem("token", data.token);

        // Reset form and show success message
        setEmail("");
        setPassword("");
       alert("login successful");

        // Navigate to the home page
        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
        alert("Login failed");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error (4xx/5xx)
        setMessage(error.response.data.message || "Login failed");
      } else {
        // Network or other error
        setMessage("Login failed. Please try again later.");
      }
      alert("Login failed");
    }
  };

  return (
    <>
    <Navbaruser/>
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 ">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-1/3">
        <div className="p-8 w-full">
          <p className="text-xl font-bold text-gray-600 text-center py-4">
            Welcome back!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-orange-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="/signup"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-orange-400"> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
