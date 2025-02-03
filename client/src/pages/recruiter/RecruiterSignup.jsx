import React, { useState } from "react";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";

function RecruiterSignup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        companyDescription: "",
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/recruiterAuth/signUp', formData);
            setMessage(response.data.message);
            alert(response.data.message);
            navigate("/recruiterLogin");
        } catch (error) {
            setMessage(error.response?.data?.message || "something went wrong");
        }
    };

    return (
        <>
            <RecruiterNavbar />
            <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
                <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-xs lg:max-w-4xl w-1/3 pt-8">
                    <div className="p-7 w-full ">
                        <p className="text-xl font-bold text-gray-600 text-center py-1">Register</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Enter the name</label>
                                <input
                                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4 flex flex-col justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                        type="text"
                                        name="companyName"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <input
                                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                        type="text"
                                        name="companyDescription"
                                        required
                                        value={formData.companyDescription}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="bg-orange-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-500"
                                >
                                    Signup
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center w-full text-center">
                            <Link to="/recruiterLogin"
                                className="text-xs text-gray-500 capitalize text-center w-full"
                            >
                                Already have an account?
                                <span className="text-orange-400"> Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default RecruiterSignup;
