import React, { createContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserJobSearchContext = createContext({});
export const UserJobSearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const page=1
  const limit = 10;
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/userJob/search?query=${query}&location=${location}&page=${page}&limit=${limit}`
      );
      setSearchResult(response.data);
      console.log(response.data,query)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <UserJobSearchContext.Provider
      value={{ handleSearch, query, setQuery, location, setLocation,searchResult,isloading }}
    >
      {children}
    </UserJobSearchContext.Provider>
  );
};
export default UserJobSearchContext;
