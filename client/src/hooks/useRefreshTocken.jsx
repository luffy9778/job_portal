import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const useRefreshTocken = () => {
  const { setAuth } = useContext(AuthContext);
  const refresh = async () => {
    console.log("refresh");
    try {
      const response = await axios.post(
        "http://localhost:3500/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      setAuth((prv) => {
        return {
          ...prv,
          accessToken: response.data.accessToken,
          role: response.data.role,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshTocken;
