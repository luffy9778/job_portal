import React from 'react';
import { Link } from 'react-router-dom';
import RecruiterNavbar from '../../components/recruiter/RecruiterNavbar';

function RecruiterViewJobs() {
  return (
    <>
    <div className='mt-32'>
    <div className="p-4 bg-gray-100 rounded-md shadow-md mx-20 flex justify-between my-5">
      <div className="text-xl font-semibold text-gray-800">
        Software Development
      </div>
      <div className="">
        <Link 
          to="/viewapplication" 
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          View Application
        </Link>
      </div>
      
    </div>
    <div className="p-4 bg-gray-100 rounded-md shadow-md mx-20 flex justify-between my-5">
      <div className="text-xl font-semibold text-gray-800">
        Software Development
      </div>
      <div className="">
        <Link 
          to="/viewapplication" 
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          View Application
        </Link>
      </div>
      
    </div>
    <div className="p-4 bg-gray-100 rounded-md shadow-md mx-20 flex justify-between my-5">
      <div className="text-xl font-semibold text-gray-800">
        Software Development
      </div>
      <div className="">
        <Link 
          to="/viewapplication" 
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          View Application
        </Link>
      </div>
      
    </div>
    </div>
    </>
  );
}

export default RecruiterViewJobs;
