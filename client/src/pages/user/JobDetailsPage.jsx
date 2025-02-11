import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import UserContext from "../../context/UserContext";

const JobDetailsPage = () => {
  const [jobData, setJobData] = useState("");
  console.log(jobData);
  const params = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { saveJob, removeSavedJobs, userData } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/userJob/job/${params.id}`);
        setJobData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="space-y-4 p-6  ">
        {/* Job Title */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold capitalize">
            {jobData?.job?.title}{" "}
            {jobData?.apllicationStatus && (
              <span className="px-5 text-sm text-gray-400">
                Applied(
                <span
                  className={`${
                    jobData?.apllicationStatus === "rejected"
                      ? "text-red-500"
                      : jobData?.apllicationStatus === "accepted"
                      ? "text-green-500"
                      : "text-blue-300"
                  }`}
                >
                  {jobData?.apllicationStatus}
                </span>
                )
              </span>
            )}
          </h1>
          {userData?.savedJobs?.includes(jobData?.job?._id) ? (
            <FontAwesomeIcon
              icon={solidBookmark}
              className="text-4xl text-orange-500 hover:scale-105"
              onClick={() => removeSavedJobs(jobData.job._id)}
            />
          ) : (
            <FontAwesomeIcon
              icon={regularBookmark}
              className="text-4xl text-orange-500 hover:scale-105"
              onClick={() => saveJob(jobData.job._id)}
            />
          )}
        </div>

        {/* Company Information */}
        <div className="flex items-center space-x-2 text-gray-600">
          {/* <img src=" https://via.placeholder.com/20" alt="Company Logo" /> */}
          <FontAwesomeIcon icon={faBuilding} className="text-2xl" />
          <h3 className="font-medium capitalize">{jobData?.job?.company}</h3>
        </div>
        <p className=" pl-10 font-medium capitalize">
          {jobData?.job?.recruiterId?.name}
        </p>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="location">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
          </span>
          <p className="font-medium capitalize">{jobData?.job?.location}</p>
        </div>

        {/* Salary */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="money">
            💰
          </span>
          <p className="font-medium">
            {" "}
            ₹{jobData?.job?.salary?.min}-₹{jobData?.job?.salary?.max}
          </p>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold">Job Description</h2>
          <p className="text-gray-700 mt-2">{jobData?.job?.description}</p>
        </div>

        {/* Responsibilities */}
        <div>
          <h2 className="text-xl font-semibold">Responsibilities</h2>
          <p className="text-gray-700 mt-2">{jobData?.job?.responsibilities}</p>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {jobData?.job?.requirements?.skills?.map((i) => (
              <li>{i}</li>
            ))}

            <li> experience: {jobData?.job?.requirements?.experience} years</li>
          </ul>
        </div>

        {/* Application Button */}
        <div className="flex justify-end mt-6">
          <button
            className={`${
              jobData?.isApplayed || jobData?.job?.status === "closed"
                ? "opacity-50 cursor-not-allowed"
                : ""
            } bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600`}
            disabled={jobData?.isApplayed || jobData?.job?.status === "closed"}
            onClick={() => navigate(`/jobApply/${jobData?.job?._id}`)}
          >
            {jobData?.job?.status === "closed"
              ? "closed"
              : jobData?.isApplayed
              ? "Already applayed"
              : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
