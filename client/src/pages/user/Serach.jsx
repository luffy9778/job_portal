import React, { useContext } from "react";
import UserJobSearchContext from "../../context/UserJobSearchContext";
import JobCard from "../../components/user/JobCard";
import { Oval } from "react-loader-spinner";

const Serach = () => {
  const {
    query,
    setQuery,
    location,
    setLocation,
    handleSearch,
    searchResult,
    isloading,
  } = useContext(UserJobSearchContext);
  return (
    <div className="font-sans">
      <section className="text-center py-5">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center w-full sm:w-2/3 mx-auto bg-white border border-gray-400 p-1 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-orange-600 text-sm">
            <input
              type="text"
              placeholder="Job Title, Keywords, or Company"
              className="w-full border-none p-3 md:pl-12 rounded-l-lg focus:outline-none text-gray-700 placeholder-gray-500 focus:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="border-l border-gray-400 h-12 mx-2"></div>

            <input
              type="text"
              placeholder="Location"
              className="w-1/2 sm:w-1/3 border-none p-3 rounded-r-lg focus:outline-none text-gray-700 placeholder-gray-500 focus:ring-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button
              className="bg-orange-500 text-white px-1 py-2 md:px-3 md:py-2 rounded-2xl ml-2 md:mr-2 hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="md:px-4">
      {isloading ? (
        <div className="flex justify-center items-center">
          <Oval
            visible={true}
            height="40"
            width="40"
            color="#e65e10"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ):
        <section id="jobs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {searchResult?.jobs?.length === 0 && (
              <div className="col-span-full text-center mt-32 md:mt-40">
                <p className="text-lg text-gray-600">No jobs found...</p>
              </div>
            )}{" "}
            {searchResult?.jobs?.map((i) => (
              <JobCard key={i._id} job={i} />
            ))}
          </div>
        </section>}
      </div>
    </div>
  );
};

export default Serach;
