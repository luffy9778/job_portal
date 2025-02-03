import React, { useEffect, useState } from "react";

function RecruiterHome() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/recruiter/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplications();
  }, []);

  const handleApprove = async (applicationId) => {
    try {
      const response = await fetch(
        `/api/recruiter/applications/${applicationId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === applicationId ? { ...app, approved: true } : app
          )
        );
      } else {
        console.error("Failed to approve application");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">
            Recruiter Dashboard
          </h1>
          {applications.map((app) => (
            <div
              key={app._id}
              className="mb-4 p-4 bg-gray-50 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{app.jobId}</h3>
                <p className="text-sm text-gray-600">
                  Name: {app.applications.userId}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {app.applications.email}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {app.applications.phone}
                </p>
                <p className="text-sm text-gray-600">
                  Resume:{" "}
                  <Link to={app.applications.resume_Url}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </Link>
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                {app.approved ? (
                  <span className="text-green-500 font-bold">Approved</span>
                ) : (
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecruiterHome;
