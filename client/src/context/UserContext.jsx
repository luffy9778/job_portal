import { createContext, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState("");
  // console.log(userData)
  const fetchUserData = async () => {
    try {
      const response = await axiosPrivate.get("/user/profile");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ userData ,fetchUserData}}>{children}</UserContext.Provider>
  );
};
export default UserContext;
