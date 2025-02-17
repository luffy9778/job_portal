import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <div>
        <AdminNavbar />
        <div className="md:ml-64">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
