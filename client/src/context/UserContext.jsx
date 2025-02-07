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

  const saveJob = async (jobId) => {
    try {
      const response = await axiosPrivate.post("/userJob/save", { jobId });
      console.log(response.data);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const removeSavedJobs = async (jobId) => {
    try {
      const response = await axiosPrivate.delete(`/userJob/remove/${jobId}`);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ userData, fetchUserData, saveJob, removeSavedJobs }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
