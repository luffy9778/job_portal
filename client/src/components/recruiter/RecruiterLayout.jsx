import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <>
      <div className=" h-screen overflow-y-auto">
        <RecruiterNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default RecruiterLayout;
