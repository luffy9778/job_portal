import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SavedJobCard from "./SavedJobCard";

const SavedJobs = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/userJob/savedJob");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {data?.map((i) => (
        <SavedJobCard
          key={i._id}
          job={i}
          status={i.status}
          date={i?.createdAt}
        />
      ))}
    </div>
  );
};

export default SavedJobs;
