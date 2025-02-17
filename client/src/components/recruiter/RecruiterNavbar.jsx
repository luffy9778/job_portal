import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faTimes, faBriefcase, faPlus, faHome } from "@fortawesome/free-solid-svg-icons";
import navicon from "../../assets/icons8-swagbucks.svg";
import useLogout from "../../hooks/useLogout";

function RecruiterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const logOut = useLogout();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white h-screen w-64 p-5 fixed transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}> 
        <div className="flex items-center justify-between mb-6">
          <Link to="/recruiter" className="flex items-center space-x-3">
            <img src={navicon} className="h-8" alt="Logo" />
            <span className="text-2xl font-semibold">MyJobGator</span>
          </Link>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="jobview" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
                <FontAwesomeIcon icon={faBriefcase} />
                <span>View Jobs</span>
              </Link>
            </li>
            <li>
              <Link to="/recruiter/addJob" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Jobs</span>
              </Link>
            </li>
            <li>
              <button onClick={logOut} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded w-full text-left">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu button for mobile */}
      <button className="md:hidden p-4 fixed" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
    </div>
  );
}

export default RecruiterSidebar;
