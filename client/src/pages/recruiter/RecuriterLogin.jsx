import React, { useContext, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function RecuriterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3500/recruiterAuth/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status == 200) {
        setAuth({
          accessToken: response.data.accessToken,
          role: response.data.role,
        });
        setEmail("");
        setPassword("");
        navigate("/recruiter");
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("no server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(
          err?.response?.data?.message || "Invalid username or password"
        );
      } else if (err.response?.status === 403) {
        setErrMsg(err?.response?.data?.message || "unAuthorised");
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };

  return (
    <>
     <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 ">
  <div className="absolute top-4 right-4 flex space-x-4">
    <Link to="/login"><button className=" text font-bold py-2 px-6 rounded ">User</button></Link>
  </div>
  <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-1/3">
    <div className="p-8 w-full">
      <p className="text-xl font-bold text-gray-600 text-center py-4">Welcome back!</p>
      {errMsg && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert" ref={errRef}>
          <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div><span className="font-medium">{errMsg}</span></div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" type="email" placeholder=" Email Address" required ref={userRef} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to="#" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">Forget Password?</Link>
        </div>
        <div className="mt-8">
          <button type="submit" className="bg-orange-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-500">Login</button>
        </div>
      </form>
      <div className="mt-4 flex items-center w-full text-center">
        <Link to="/signup" className="text-xs text-gray-500 capitalize text-center w-full">Don&apos;t have any account yet? <span className="text-orange-400"> Sign Up</span></Link>
      </div>
    </div>
  </div>
</div>

      <Footer />
    </>
  );
}

export default RecuriterLogin;
