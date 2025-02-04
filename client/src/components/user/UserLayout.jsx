import React from "react";
import Navbaruser from "../Navbaruser";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";
import { UserJobSearchProvider } from "../../context/UserJobSearchContext";

const UserLayout = () => {
  return (
    <>
      <UserProvider>
        <UserJobSearchProvider>
          <Navbaruser />
          <Outlet />
        </UserJobSearchProvider>
      </UserProvider>
    </>
  );
};

export default UserLayout;
