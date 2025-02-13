import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useRefreshToken from "./useRefreshTocken";
import axiosPrivate from "../api/axiosPrivate";

const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.log("no token");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const accessToken = await refresh();
          if (!accessToken) return Promise.reject(error);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
