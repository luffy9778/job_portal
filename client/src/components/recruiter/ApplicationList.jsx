import { format } from "date-fns";
import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ApplicationList = ({ data, index, fetchApplications }) => {
  const axiosPrivate = useAxiosPrivate();
  const handelStatusChange = async (id, status) => {
    try {
      const response = await axiosPrivate.patch(`/application/status/${id}`, {
        status,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      fetchApplications();
    }
  };
  return (
    <>
      <tr
        key={data?.id}
        className="border-spacing-0 border-b hover:bg-orange-400 transition-all group duration-300"
      >
        <td className="capitalize text-center py-2 group-hover:text-white rounded-l-xl text-xs md:text-base">
          {index + 1}
        </td>
        <td className="text-start py-2 group-hover:text-white text-xs md:text-base">
          {data?.applicantName}
        </td>
        <td className="text-start py-2 group-hover:text-white text-xs md:text-base">
          {data?.applicantEmail}
        </td>
        <td className="text-start py-2 group-hover:text-white text-xs hidden md:table-cell md:text-base">
          {data?.applicantPhone}
        </td>
        <td className="text-start py-2 group-hover:text-white text-xs hidden md:table-cell md:text-base">
          {format(new Date(data?.appliedAt), "dd-MM-yyyy")}
        </td>
        <td className="text-center py-2">
          <div className="inline-block transition-transform duration-200 hover:scale-110 hover:underline">
            <a
              href={data?.resume}
              target="_blank"
              className="text-orange-500 group-hover:text-sky-600"
            >
              view
            </a>
          </div>
        </td>

        {/* {data?.status === "pending" ? (
          <> */}
        <td className="text-start py-2 flex flex-col sm:flex-row gap-2 md:w-2/12 md:rounded-r-xl">
          {data?.status === "rejected" ? (
            <>
              <div className="text-red-700 font-semibold py-2">Rejected</div>
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => handelStatusChange(data.id, "accepted")}
              >
                Approve
              </button>
            </>
          ) : (
            <>
              <div className="text-green-700 font-semibold py-2">Accepted</div>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handelStatusChange(data.id, "rejected")}
              >
                Reject
              </button>
            </>
          )}
        </td>
        {/* </> */}
        {/* ) : (
          <td className="text-start py-2 group-hover:text-white rounded-r-xl text-xs md:text-base">
            {data?.status}
          </td>
        )} */}
      </tr>
    </>
  );
};

export default ApplicationList;
