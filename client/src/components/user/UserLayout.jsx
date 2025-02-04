import React from "react";
import Navbaruser from "../Navbaruser";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";

const UserLayout = () => {
  return (
    <>
      <UserProvider>
        <Navbaruser />
        <Outlet />
      </UserProvider>
    </>
  );
};

export default UserLayout;
