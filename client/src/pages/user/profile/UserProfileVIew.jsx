import React from "react";

const UserProfileVIew = ({ userData, setUpdate }) => {
  return (
    <>
       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">

      {/* Profile Info Section */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-900">{userData?.firstName} {userData?.lastName}</span>
        </div>

        {/* Skills Section */}
        {userData?.profile?.skills?.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <strong className="text-gray-700">Skills:</strong>{" "}
            <span className="text-gray-900">{userData?.profile?.skills?.join(", ")}</span>
          </div>
        )}

        {/* Experience Section */}
        {userData?.profile?.experience?.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <strong className="text-gray-700">Experience:</strong>
            {userData?.profile?.experience?.map((exp, index) => (
              <div key={index} className="text-gray-900 mt-1">
                <span className="font-medium">{exp.companyName}</span> - {exp.years} years
              </div>
            ))}
          </div>
        )}

        {/* Resume Section */}
        {userData?.profile?.resume_Url && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <strong className="text-gray-700">Resume:</strong>{" "}
            <a
              href={userData?.profile?.resume_Url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              View Resume
            </a>
          </div>
        )}
      </div>

      {/* Update Profile Button */}
      <div className="text-center mt-6">
        <button
          className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          onClick={() => setUpdate(true)}
        >
          Update Profile
        </button>
      </div>
    </div>
    </>
  );
};

export default UserProfileVIew;
