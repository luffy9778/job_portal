import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../context/UserContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import BgBlurSpinner from "../../components/spinners/BgBlurSpinner";

function JobApplicationForm({ jobId }) {
  const { userData } = useContext(UserContext);
  const [steps, setSteps] = useState(1);
  const [resume, setResume] = useState(null);
  const fileRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const navigate=useNavigate()
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phoneNo: "",
  //   resume: "",
  //   skills: "",
  //   experience: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    fileRef.current.value = "";
    setResume(null);
  };
  const handleFileChnage = (e) => {
    setResume(e.target.files[0]);
    setIsChecked(false);
  };

  const nextSteps = () => setSteps(steps + 1);
  const prevSteps = () => setSteps(steps - 1);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const data = resume ? { resume, jobId: params.id } : { jobId: params.id };
    try {
      const response = await axiosPrivate.post("/userJob/applayJob", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Application Submitted..",
        icon: "success",
        draggable: true,
      });
      navigate(-2);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Application failed..!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      navigate(-1);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      {isLoading && (
        <BgBlurSpinner/>
      )}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Job Application - Step {steps}
        </h2>

        {/* Step 1 - Personal Information */}
        {steps === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Information
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.firstName + " " + userData.lastName}
              // onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              // onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone Number"
              value={userData.phone}
              // onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <div className="text-right">
              <button
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
                onClick={nextSteps}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Experience & Skills */}
        {steps === 2 && (
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="flex justify-between  pr-8 border border-gray-300 rounded-lg">
                <div className="flex">
                  <span className="bg-red-600 h-full rounded-l-lg text-white flex items-center px-6">
                    pdf
                  </span>
                  <p className=" p-4">
                    <a
                      href=""
                      target="_blank"
                      className="hover:text-blue-600 hover:underline"
                    >
                      Your Resume
                    </a>
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheck}
                  className="w-5"
                />
              </div>
            </div>
            {/* <h3 className="text-lg font-semibold text-gray-700">Experience & Skills</h3>
          <textarea
            name="experience"
            placeholder="Work Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <textarea
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          ></textarea> */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                ref={fileRef}
                onChange={handleFileChnage}
                className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={prevSteps}
              >
                Back
              </button>
              <button
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
                onClick={nextSteps}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Review & Submit */}
        {steps === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Review & Submit
            </h3>
            <p>
              <strong>Name:</strong>{" "}
              {userData.firstName + " " + userData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            {/* <p>
              <strong>Experience:</strong> {formData.experience}
            </p>
            <p>
              <strong>Skills:</strong> {formData.skills}
            </p> */}
            <p>
              <strong>Resume:</strong>{" "}
              {resume ? resume.name : "your resume.pdf"}
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={prevSteps}
              >
                Back
              </button>
              <button
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default JobApplicationForm;
