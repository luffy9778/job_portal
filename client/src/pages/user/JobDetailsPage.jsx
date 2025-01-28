import React from "react";

const JobDetailsPage = () => {

  const handleAddJob = async()=>{
    
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="space-y-4 p-6">
        {/* Job Title */}
        <h1 className="text-2xl font-bold"></h1>

        {/* Company Information */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="briefcase">💼</span>
          <p className="font-medium">Tech Innovators Inc.</p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="location">📍</span>
          <p className="font-medium">New York, NY</p>
        </div>

        {/* Salary */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span role="img" aria-label="money">💰</span>
          <p className="font-medium">$120,000 - $150,000 per year</p>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold">Job Description</h2>
          <p className="text-gray-700 mt-2">
            We are looking for a skilled Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining software solutions that drive our business forward. If you are passionate about coding, problem-solving, and working in a collaborative environment, this position is for you.
          </p>
        </div>

        {/* Responsibilities */}
        <div>
          <h2 className="text-xl font-semibold">Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Develop and maintain high-quality software applications.</li>
            <li>Collaborate with cross-functional teams to define project requirements.</li>
            <li>Write clean, scalable, and efficient code.</li>
            <li>Conduct code reviews and ensure adherence to best practices.</li>
            <li>Troubleshoot and debug software issues.</li>
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Bachelor's degree in Computer Science or related field.</li>
            <li>3+ years of experience in software development.</li>
            <li>Proficiency in JavaScript, React, and Node.js.</li>
            <li>Strong problem-solving and analytical skills.</li>
            <li>Excellent communication and teamwork abilities.</li>
          </ul>
        </div>

        {/* Application Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
