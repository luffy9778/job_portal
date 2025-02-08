import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { debounce } from "lodash";
import PaginationBar from "../../../components/pagination/PaginationBar";
import OvalLoadingSpinner from "../../../components/spinners/OvalLoadingSpinner";

function ViewRecruiterList() {
  const [recruitersData, setRecruitersData] = useState([]);
  const [data, setData] = useState([]);
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
  const [selectedStatus, setSelectedStatus] = useState("all");

  const fetchRecruiters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/admin/recruiters/get?query=${query}&days=${selectedFilter.value}&limit=${limit}&page=${currentPage}`
      );
      setRecruitersData(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, selectedFilter, currentPage]);

  useEffect(() => {
    fetchRecruiters();
  }, [selectedFilter, currentPage]);

  const debouncedSearch = useCallback(
    debounce(() => {
      fetchRecruiters();
    }, 400),
    [fetchRecruiters]
  );

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel(); // Cleanup previous calls
  }, [query]);

  useEffect(() => {
    console.log(selectedStatus);
    if (selectedStatus === "all") {
      setData(recruitersData.recruiter);
    } else {
      setData(
        recruitersData.recruiter.filter((i) => i.status === selectedStatus)
      );
    }
  }, [selectedStatus, recruitersData]);

  async function handleApprove(id) {
    setData((prevData) =>
      prevData.map((recruiter) =>
        recruiter._id === id ? { ...recruiter, status: "approved" } : recruiter
      )
    );
    try {
      const response = await axiosPrivate.patch(
        `/admin/recruiters/approve/${id}`
      );
    } catch (error) {
      console.error("Error approving recruiter:", error);
      fetchRecruiters();
    }
  }

  async function handleReject(id) {
    setData((prevData) =>
      prevData.map((recruiter) =>
        recruiter._id === id ? { ...recruiter, status: "rejected" } : recruiter
      )
    );
    try {
      const response = await axiosPrivate.patch(
        `/admin/recruiters/reject/${id}`
      );
    } catch (error) {
      fetchRecruiters();
      console.error("Error approving recruiter:", error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-100 p-6">
        <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg flex flex-col">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">
            Recruiter List
          </h1>

          {/* Filters & Search */}
          <div className="relative flex flex-wrap sm:flex-row gap-4 justify-between items-center pb-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
              >
                {selectedFilter.label}
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <ul className="p-3 space-y-1 text-sm text-gray-700">
                    {filters.map((filter) => (
                      <li key={filter.value}>
                        <button
                          onClick={() => {
                            setSelectedFilter(filter);
                            setIsDropdownOpen(false);
                          }}
                          className="flex w-full items-center p-2 rounded-sm hover:bg-gray-100"
                        >
                          {filter.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search for items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
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
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <select
                        className="text-sm"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
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
                  ) : data?.length === 0 ? (
                    <tr className="h-40">
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    data?.map((i, index) => (
                      <tr
                        key={i._id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {index + 1 + (currentPage - 1) * limit}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {i.name}
                        </td>
                        <td className="px-6 py-4">{i.email}</td>
                        <td className="px-6 py-4">{i.company.name}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          {i.status === "pending" ? (
                            <button
                              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                              onClick={() => handleApprove(i._id)}
                            >
                              Approve
                            </button>
                          ) : i.status === "approved" ? (
                            <p className="text-green-600 font-semibold">
                              Approved
                            </p>
                          ) : (
                            <p className="text-red-600 font-semibold">
                              Rejected
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {i.status !== "rejected" && (
                            <button
                              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                              onClick={() => handleReject(i._id)}
                            >
                              Block
                            </button>
                          )}
                          {i.status === "rejected" && (
                            <button
                              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                              onClick={() => handleApprove(i._id)}
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
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
}

export default ViewRecruiterList;
