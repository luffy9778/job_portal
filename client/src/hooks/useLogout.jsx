import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { auth, setAuth ,setLoggingOut} = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut = async () => {
    const role = auth?.role;   
    try {
      await axios.post(
        "http://localhost:3500/auth/logOut",
        {},
        {
          withCredentials: true,
        }
      );
      setLoggingOut(true);
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
      setTimeout(() => {
        setAuth(null);
        setLoggingOut(false); // Reset flag
      }, 100);
    } catch (error) {
      console.log("logout failed", error);
    }
  };
  return logOut;
};

export default useLogout;
