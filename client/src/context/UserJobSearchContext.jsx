import React, { createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserJobSearchContext = createContext({});
export const UserJobSearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/userJob/search?query=${query}&location=${location}&page=${currentPage}&limit=${limit}`
      );
      setSearchResult(response.data);
      setTotalPages(response.data?.totalPages);
      console.log(response.data, query);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    handleSearch();
  },[currentPage])

  return (
    <UserJobSearchContext.Provider
      value={{
        handleSearch,
        query,
        setQuery,
        location,
        setLocation,
        searchResult,
        isloading,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </UserJobSearchContext.Provider>
  );
};
export default UserJobSearchContext;
