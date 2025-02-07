import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SavedJobCard = ({ job, status, date }) => {
  const navigate = useNavigate();
  const timeAgo = date ? formatDistanceToNow(date, { addSuffix: true }) : "";
  return (
    <div className="my-2 flex justify-between px-1 md:px-14 text-sm md:text-base hover:bg-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-2 md:w-14 md:h-14 md:mr-8 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-jqMXOqsUz-I1x7QrD6LX1WnxIUSS-kR7rQ92OFxcZNJ02VuGgmWjYQ&s"
            alt="Job Image"
            className="h-full w-full rounded-md"
          />
        </div>
        <div className="py-2">
          <h2 className=" md:text-lg font-semibold hover:underline">
            <Link to={`/jobDetails/${job?._id}`}>{job?.title}</Link>
          </h2>
          <p>{job?.company}</p>
          <p>{job?.location}</p>
        </div>
      </div>
      <div className="flex  items-center">
        {job?.status === "closed" ? (
          <div className="text-red-600 font-semibold">
            <FontAwesomeIcon icon={faBan} className="px-1" />
            no longar available
          </div>
        ) : (
          <>
            <div className="hidden md:block text-gray-500 mr-12">
              <p>{timeAgo}</p>
            </div>
            {status
              ? {
                  pending: (
                    <div className="text-blue-700 border border-blue-700 py-1 px-2 rounded-lg bg-blue-100">
                      Pending
                    </div>
                  ),
                  rejected: (
                    <div className="text-red-700 border border-red-700 py-1 px-2 rounded-lg bg-red-100">
                      Rejected
                    </div>
                  ),
                  accepted: (
                    <div className="text-green-700 border border-green-700 py-1 px-2 rounded-lg bg-green-100">
                      Accepted
                    </div>
                  ),
                }[status] || (
                  <button
                    className="p-3 md:px-6 bg-orange-500 text-white rounded-lg md:font-semibold hover:scale-105"
                    onClick={() => navigate(`/jobDetails/${job?._id}`)}
                  >
                    Details
                  </button>
                )
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedJobCard;
