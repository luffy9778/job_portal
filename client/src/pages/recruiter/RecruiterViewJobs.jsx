import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationBar from "../../components/pagination/PaginationBar";
import OvalLoadingSpinner from "../../components/spinners/OvalLoadingSpinner";

function RecruiterViewJobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  console.log(postedJobs);
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
      const response = await axiosPrivate.patch(`job/close/${jobId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      fetchPostedJobs();
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="pt-16 bg-gray-500 bg-opacity-5 w-fit px-6">
          <div className="flex py-4 md:px-4 gap-3">
            <div
              className={`${
                status === "open" &&
                "border-b-4 rounded border-orange-500 text-orange-500"
              } hover:scale-105 `}
              onClick={() => setStatus("open")}
            >
              Opened
            </div>
            <div className="h-7 w-[0.1rem] rounded-lg bg-black my-auto"></div>
            <div
              className={`${
                status === "closed" &&
                "border-b-4 rounded border-orange-500 text-orange-500"
              } hover:scale-105 `}
              onClick={() => setStatus("closed")}
            >
              Closed{" "}
            </div>
          </div>
        </div>
        <div className="bg-gray-500 bg-opacity-5 flex-1 flex flex-col  w-full py-5 md:px-20 ">
          {isLoading ? (
            <div className="h-full flex justify-center items-center">
              <OvalLoadingSpinner />
            </div>
          ) : !postedJobs?.jobs?.length ? (
            <div className="h-full flex items-center justify-center  ">
              <p className=" text-xl ">No job found...</p>
            </div>
          ) : (
            <>
              {postedJobs?.jobs?.map((i) => (
                <div className="py-4 px-4 md:px-16 bg-white rounded-xl shadow-md mx-2 md:mx-20 flex justify-between items-center mb-5 text-sm md:text-base">
                  <div className="text-xl font-semibold text-gray-800">
                    {i.title}{" "}
                  </div>
                  <div className=" flex items-center">
                    {i?.status === "open" && (
                      <div className=" pr-2 md:pr-8">
                        <button
                          className="p-1 md:px-4 md:py-2 rounded-lg bg-red-600 text-white hover:scale-105 "
                          onClick={() => handleClose(i._id)}
                        >
                          close job
                        </button>
                      </div>
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

              <div className="relative pt-9 w-full text-white">
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
    </>
  );
}

export default RecruiterViewJobs;
