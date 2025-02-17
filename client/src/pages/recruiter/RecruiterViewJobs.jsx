import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationBar from "../../components/pagination/PaginationBar";
import OvalLoadingSpinner from "../../components/spinners/OvalLoadingSpinner";

function RecruiterViewJobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [status, setStatus] = useState("open");
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const fetchPostedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/job?status=${status}&page=${currentPage}&limit=${limit}`
      );
      setPostedJobs(response?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostedJobs();
  }, [status, currentPage]);

  const handleClose = async (jobId) => {
    try {
      await axiosPrivate.patch(`job/close/${jobId}`);
    } catch (error) {
      console.log(error);
    } finally {
      fetchPostedJobs();
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <div className="text-center py-4 w-full">
          <div className="inline-flex gap-3 text-lg">
            <div
              className={`cursor-pointer ${
                status === "open" && "border-b-4 border-orange-500 text-orange-500"
              }`}
              onClick={() => setStatus("open")}
            >
              Opened
            </div>
            <div className="h-6 w-[0.1rem] bg-black"></div>
            <div
              className={`cursor-pointer ${
                status === "closed" && "border-b-4 border-orange-500 text-orange-500"
              }`}
              onClick={() => setStatus("closed")}
            >
              Closed
            </div>
          </div>
        </div>
        <div className="py-5">
          {isLoading ? (
            <div className="flex justify-center">
              <OvalLoadingSpinner />
            </div>
          ) : !postedJobs?.jobs?.length ? (
            <div className="text-center text-xl">No job found...</div>
          ) : (
            <>
              {postedJobs?.jobs?.map((i) => (
                <div className="py-4 px-4 md:px-14 bg-gray-50 rounded-xl shadow-md flex justify-between items-center mb-5 text-sm">
                  <div className="text-xl font-semibold text-gray-800">{i.title}</div>
                  <div className="flex items-center">
                    {i?.status === "open" && (
                      <button
                        className="p-2 rounded-lg bg-red-600 text-white hover:scale-105 md:mr-12"
                        onClick={() => handleClose(i._id)}
                      >
                        Close Job
                      </button>
                    )}
                    <Link
                      to={`/recruiter/viewapplication/${i._id}`}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      View Application
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pt-14 flex justify-center relative">
                <PaginationBar
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterViewJobs;
