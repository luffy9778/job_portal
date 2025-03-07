import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { debounce } from "lodash";
import PaginationBar from "../../../components/pagination/PaginationBar";
import OvalLoadingSpinner from "../../../components/spinners/OvalLoadingSpinner";
import DateFilter from "../../../components/admin/DateFilter";
import TableSearchBar from "../../../components/admin/TableSearchBar";
import UserViewTableList from "../../../components/admin/UserViewTableList";
import StatusFilter from "../../../components/admin/StatusFilter";

const VeiwUsers = () => {
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const axiosPrivate = useAxiosPrivate();

  const filters = [
    { label: "This Month", value: "thisMonth" },
    { label: "Last 30 Days", value: "last30days" }, //default in backend switch case
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 7 Days", value: "last7Days" },
    { label: "Last Day", value: "lastDay" },
    { label: "Last Year", value: "lastYear" },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filters[1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isStatusDropDeownOpen, setIsStatusDropDeownOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/admin/users/get?query=${query}&days=${selectedFilter.value}&limit=${limit}&page=${currentPage}&status=${selectedStatus}`
      );
      setUserData(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, selectedFilter, currentPage, selectedStatus]);

  useEffect(() => {
    fetchUsers();
  }, [selectedFilter, currentPage, selectedStatus]);

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchUsers();
    }, 400),
    [fetchUsers]
  );

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel(); // Cleanup previous calls
  }, [query]);

  async function handleBlock(id, status) {
    // setData((prevData) =>
    //   prevData.map((recruiter) =>
    //     recruiter._id === id ? { ...recruiter, status: "approved" } : recruiter
    //   )
    // );
    let url;
    if (status) {
      url = `/admin/users/block/${id}`;
    } else {
      url = `/admin/users/unblock/${id}`;
    }
    try {
      console.log(url);
      const response = await axiosPrivate.patch(url);
      console.log(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error in userBlock handler", error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-100 p-6">
        <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg flex flex-col">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">User List</h1>

          {/* Filters & Search */}
          <div className="relative flex flex-wrap sm:flex-row gap-4 justify-between items-center pb-4">
            <DateFilter
              filters={filters}
              isDropdownOpen={isDropdownOpen}
              selectedFilter={selectedFilter}
              setIsDropdownOpen={setIsDropdownOpen}
              setSelectedFilter={setSelectedFilter}
            />

            <StatusFilter
              filters={["All", "Blocked", "Not Blocked"]}
              isStatusDropDeownOpen={isStatusDropDeownOpen}
              selectedStatus={selectedStatus}
              setIsStatusDropDeownOpen={setIsStatusDropDeownOpen}
              setSelectedStatus={setSelectedStatus}
            />

            <TableSearchBar query={query} setQuery={setQuery} />
          </div>

          <div className="flex-1 overflow-hidden border rounded-lg">
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr className="h-40">
                      <td colSpan="6">
                        <div className="w-full flex justify-center py-10 text-gray-500">
                          <OvalLoadingSpinner />
                        </div>
                      </td>
                    </tr>
                  ) : userData.user?.length === 0 ? (
                    <tr className="h-40">
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    userData.user?.map((i, index) => (
                      <UserViewTableList
                        key={i._id}
                        data={i}
                        index={index}
                        currentPage={currentPage}
                        limit={limit}
                        handleBlock={handleBlock}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className="relative pt-9 w-full text-white"> */}
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default VeiwUsers;
