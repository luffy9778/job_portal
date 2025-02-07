import React, { useEffect, useState } from "react";
import SavedJobCard from "./SavedJobCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AppliedJobs = () => {
    const [data, setData] = useState([])
        const axiosPrivate=useAxiosPrivate()
        useEffect(()=>{
            const fetchData=async()=>{
                try {
                    const response=await axiosPrivate.get("/userJob/aplliedJob")
                    setData( response.data)
                } catch (error) {
                    console.log(error)
                } 
            }
            fetchData()
        },[])
  return (
    <>
      {!data.length ? (
        <p>not applied for any job </p>
      ) : (
        data?.map((i) => (
          <SavedJobCard
            key={i._id}
            job={i.jobId}
            status={i.status}
            date={i?.createdAt}
          />
        ))
      )}
    </>
  );
};

export default AppliedJobs;
