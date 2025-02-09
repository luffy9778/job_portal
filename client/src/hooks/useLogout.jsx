import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:3500/auth/logOut",
        {},
        {
          withCredentials: true,
        }
      );
      const role = auth?.role;
        setAuth(null);

      switch (role) {
        case "recruiter":
          navigate("/recruiterLogin");
          break;
        case "admin":
          navigate("/adminLogin");
          break;
        default:
          navigate("/login");
      }
    } catch (error) {
      console.log("logout failed", error);
    }
  };
  return logOut;
};

export default useLogout;
