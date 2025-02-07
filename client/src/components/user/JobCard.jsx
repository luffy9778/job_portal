import React, { useContext } from "react";
import logo from "../../assets/linked.svg";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons"; 
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import UserContext from "../../context/UserContext";
const jobCard = ({ job }) => {
  const timeAgo = formatDistanceToNow(job?.createdAt, { addSuffix: true });
  const navigate=useNavigate()
  const{saveJob,removeSavedJobs,userData}=useContext(UserContext)
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex justify-between">
      <div className="flex items-center mb-4 ">
        <img src={logo} class="h-8" alt="company logo" />
        <div className="pl-2">
          <h3 className="text-lg font-medium">{job?.recruiterId.name}</h3>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
        </div>
        {userData?.savedJobs?.includes(job._id)?
        <FontAwesomeIcon icon={solidBookmark} className="text-3xl  hover:scale-105"  onClick={()=>removeSavedJobs(job._id)}/>:
        <FontAwesomeIcon icon={regularBookmark} className="text-3xl  hover:scale-105" onClick={()=>saveJob(job._id)}/>}
      </div>
      <h4 className="text-lg font-semibold">{job?.title}</h4>
      <p className="text-sm text-gray-500 my-2">{timeAgo}</p>
      <p className="text-sm text-gray-700 mb-4">
        {job?.description.length > 60
          ? `${job?.description.slice(0, 60)}...`
          : job?.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.requirements?.skills?.slice(0, 6).map((i) => (
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
            {i}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-gray-800">
          ₹{job?.salary?.min}-₹{job?.salary?.max}
        </p>
          <button className="bg-orange-400 text-white text-sm font-medium py-2 px-4 rounded hover:bg-orange-500"
          onClick={()=>navigate(`/jobDetails/${job._id}`)}>
            Details
          </button>
      </div>
    </div>
  );
};

export default jobCard;
