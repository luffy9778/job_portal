import React, { useContext, useEffect, useState } from "react";
import useRefreshTocken from "../hooks/useRefreshTocken";
import AuthContext from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshTocken();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const verufyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verufyRefreshToken() : setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#ff871f"
            secondaryColor="#fa8c2d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
