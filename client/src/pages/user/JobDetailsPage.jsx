import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const JobDetailsPage = () => {
  const [jobData, setJobData] = useState("");
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  console.log(jobData);
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

  const handleJobApplay = async (jobId) => {
    // try {
    //   const response = await axiosPrivate.post(
    //     `/userJob/applayJob`,
    //     { jobId },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (response.status === 201) {
    //     alert("Job Applied Successfully");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert("Error Occured");
    // }
  };

  return (
    <div className=" p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="space-y-4 p-6  ">
        {/* Job Title */}
        <h1 className="text-2xl font-bold">
          {jobData?.job?.title}{" "}
          {jobData?.apllicationStatus && (
            <span className="px-5 text-sm text-gray-400">
              Applied({jobData?.apllicationStatus})
            </span>
          )}
        </h1>

        {/* Company Information */}
        <div className="flex items-center space-x-2 text-gray-600">
          <img src=" https://via.placeholder.com/20" alt="Company Logo" />

          <h3 className="font-medium">
            {jobData?.job?.company}
          </h3>
        </div>
        <p className=" pl-10 font-medium">{jobData?.job?.recruiterId?.name}</p>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="location">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
          </span>
          <p className="font-medium">{jobData?.job?.location}</p>
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
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Develop and maintain high-quality software applications.</li>
            <li>
              Collaborate with cross-functional teams to define project
              requirements.
            </li>
            <li>Write clean, scalable, and efficient code.</li>
            <li>
              Conduct code reviews and ensure adherence to best practices.
            </li>
            <li>Troubleshoot and debug software issues.</li>
          </ul>
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
            onClick={() => handleJobApplay(jobData?.job?._id)}
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
