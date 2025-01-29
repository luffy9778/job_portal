import React from "react";
import Navbaruser from "../Navbaruser";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbaruser />
      <Outlet />
    </>
  );
};

export default UserLayout;
