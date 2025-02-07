import React, { useEffect, useState, useRef } from "react";
import navicon from "../assets/icons8-swagbucks.svg";
import profilePic from "../assets/avathar.svg";
import { Link, useParams } from "react-router-dom";

function Navbaruser() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const params = useParams();

  // Dropdown references
  const profileDropdownRef = useRef(null);

  // Close dropdowns when the route changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [params]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={navicon} className="h-8" alt="MyJobGator Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MyjobGator
          </span>
        </Link>
        <button
          onClick={() => setShowButton(!showButton)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <div
          className={`${
            showButton ? "block" : "hidden"
          } w-full md:block md:w-auto md:static`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 md:ml-auto md:justify-end p-4 md:p-0 border md:border-0 rounded-lg shadow md:shadow-none">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-orange-700 rounded-sm md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/myjobs"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500"
              >
                My jobs
              </Link>
            </li>

            {/* Profile Dropdown */}
            <li className="relative" ref={profileDropdownRef}>
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <ul className="py-2 text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbaruser;
