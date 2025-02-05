import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from "date-fns";

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  console.log(applications);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/application/get/${params.id}`
        );
        setApplications(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);
  return (
    <div className="h-screen flex flex-col pt-16">
      {!applications?.applications?.length ? (
        <div className="h-full flex items-center justify-center">
          <p>no application received yet</p>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-center text-2xl py-2">{applications?.job}</h1>
          </div>
          <div className="md:mx-8 ">
            <table className="w-full">
              <thead>
                <tr className=" border-spacing-0 border-b">
                  <th className="text-center w-1/12  py-2">#</th>
                  <th className="text-start w-2/12 py-2">Name</th>
                  <th className="text-start w-3/12 py-2">Email</th>
                  <th className="text-start w-2/12 py-2">Phone</th>
                  <th className="text-start w-1/12 py-2">Applied</th>
                  <th className="text-center w-1/12 py-2">Resume</th>
                  <th className="text-start w-1/12 py-2"></th>
                  <th className="text-start w-1/12 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {applications?.applications?.map((i, index) => (
                  <tr
                    key={i.id}
                    className=" border-spacing-0 border-b hover:bg-orange-400 transition-all group duration-300"
                  >
                    <td className=" capitalize text-center py-2 group-hover:text-white rounded-l-xl">
                      {index + 1}
                    </td>
                    <td className="text-start py-2 group-hover:text-white">
                      {i.applicantName}
                    </td>
                    <td className="text-start py-2 group-hover:text-white">
                      {i.applicantEmail}
                    </td>
                    <td className="text-start py-2 group-hover:text-white">
                      {i.applicantPhone}
                    </td>
                    <td className="text-start py-2 group-hover:text-white">
                      {format(new Date(i.appliedAt), "dd/MM/yyyy")}
                    </td>
                    <td className="text-center py-2">
                      <div className="inline-block transition-transform duration-200 hover:scale-110 hover:underline">
                        <a
                          href={i.resume}
                          target="_blank"
                          className="text-orange-500 group-hover:text-sky-600"
                        >
                          view
                        </a>
                      </div>
                    </td>

                    {i.status === "pending" ? (
                      <>
                        <td className="text-start pt-2 ">
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            Approve
                          </button>
                        </td>
                        <td className="text-start pt-2 rounded-r-xl">
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Reject
                          </button>
                        </td>
                      </>
                    ) : (
                      <td className="text-start py-2 group-hover:text-white rounded-r-xl">
                        {i.status}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationView;
