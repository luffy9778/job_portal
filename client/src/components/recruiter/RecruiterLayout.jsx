import React from "react";
import RecruiterNavbar from "./RecruiterNavbar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <>
      <RecruiterNavbar />
      <Outlet />
    </>
  );
};

export default RecruiterLayout;
