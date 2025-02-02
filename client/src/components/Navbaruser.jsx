import React, { useState } from "react";
import navicon from "../assets/icons8-swagbucks.svg";
import profilePic from "../assets/avathar.svg";
import { Link } from "react-router-dom";

function Navbaruser() {

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3">
          <img src={navicon} className="h-8" alt="MyJobGator Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MyJobGator
          </span>
        </a>
        <div className="flex items-center space-x-4">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li><a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-orange-500 md:p-0 dark:text-white md:dark:text-orange-500">Home</a></li>
              <li><a href="#about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500">About</a></li>
              <li><a href="#jobs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500">Jobs</a></li>
              <li><Link to="/signUp" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500">Signup</Link></li>
              <li><Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-white md:dark:hover:text-orange-500">Login</Link></li>
            </ul>
          </div>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img src={profilePic} alt="Profile" className="h-8 w-8 rounded-full border" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <ul className="py-2 text-gray-700 dark:text-gray-200">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link></li>
                  <li><a href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a></li>
                  <li><a href="/logout" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbaruser;
