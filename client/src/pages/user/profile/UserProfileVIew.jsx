import React from "react";

const UserProfileVIew = ({ userData, setUpdate }) => {
  return (
    <>
      <div className="mb-4">
        <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
      </div>

      <div className="mb-4">
        {userData?.profile?.skills?.length > 0 && (
          <>
            <strong>Skills:</strong> {userData?.profile?.skills?.join(", ")}
          </>
        )}
      </div>

      <div className="mb-4">
        {userData?.profile?.experience?.length > 0 && (
          <>
            <strong>Experience:</strong>
            {userData?.profile?.experience?.map((exp, index) => (
              <div key={index}>
                {exp.companyName} - {exp.years} years
              </div>
            ))}
          </>
        )}
      </div>

      <div className="mb-4">
        {userData?.profile?.resume_Url && (
          <>
            <strong>Resume: </strong>
            {/* {userData?.profile?.resume_Url
              .split("/")
              .pop()
              .split("-")
              .slice(1)
              .join("-")} */}
            <a
              href={userData?.profile?.resume_Url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span className="text-blue-700">View Resume </span>
            </a>
          </>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
          onClick={() => setUpdate(true)}
        >
          Update Profile
        </button>
      </div>
    </>
  );
};

export default UserProfileVIew;
