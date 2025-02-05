import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplicationList from "../../components/recruiter/ApplicationList";

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  console.log(applications);
  //   const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  const fetchApplications = async () => {
    //   setIsLoading(true);
    try {
      const response = await axiosPrivate.get(`/application/get/${params.id}`);
      setApplications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
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
          <div className="md:mx-8">
            <table className="w-full">
              <thead>
                <tr className="border-spacing-0 border-b">
                  <th className="text-center w-1/12 py-2 text-xs md:text-base">
                    #
                  </th>
                  <th className="text-start w-2/12 py-2 text-xs md:text-base">
                    Name
                  </th>
                  <th className="text-start w-3/12 py-2 text-xs md:text-base">
                    Email
                  </th>
                  <th className="text-start w-2/12 py-2 text-xs hidden md:table-cell md:flex-row md:text-base">
                    Phone
                  </th>
                  <th className="text-start w-1/12 py-2 text-xs hidden md:table-cell md:text-base">
                    Applied
                  </th>
                  <th className="text-center w-1/12 py-2 text-xs md:text-base">
                    Resume
                  </th>
                  <th className="text-start w-2/12 py-2 text-xs md:text-base">
                    Status
                  </th>
                  {/* <th className="text-start w-1/12 py-2 text-xs md:text-base"></th> */}
                </tr>
              </thead>
              <tbody>
                {applications?.applications?.map((i, index) => (
                  <ApplicationList
                    index={index}
                    key={i?.id}
                    data={i}
                    fetchApplications={fetchApplications}
                  />
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
