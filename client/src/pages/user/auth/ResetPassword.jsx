import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OvalLoadingSpinner from "../../../components/spinners/OvalLoadingSpinner";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkResetToken = async () => {
      setLoading(true);
      try {
        await axios.get("http://localhost:3500/userAuth/check-reset-token", {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkResetToken();
  }, [navigate]);

  const handleSubmit = async () => {
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3500/userAuth/reset-password",
        { newPassword },
        { withCredentials: true } // Send HTTP-only cookie
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "password changed successfully",
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
       {loading?<OvalLoadingSpinner/>:
      <div className="w-4/5 md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your new password below.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
        />

        <button
          className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!newPassword || !confirmPassword}
        >
          Reset Password
        </button>
      </div>}
    </div>
  );
};

export default ResetPassword;
