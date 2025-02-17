import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <>
      <div className=" h-screen overflow-y-auto">
        <RecruiterNavbar />
        <div className="md:ml-64">
                  <Outlet />
                </div>
      </div>
    </>
  );
};

export default RecruiterLayout;
