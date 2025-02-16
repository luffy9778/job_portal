import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
const AddJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
    responsibilities: "",
    description: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const validate = (name, value) => {
    let error = "";
    if (
      name === "experience" ||
      name === "minSalary" ||
      name === "maxSalary"
    ) {
      if (value < 0) {
        error = "Value cannot be negative";
      }
    }
    if (name === "minSalary" && jobData.maxSalary) {
      if (parseInt(value) >= parseInt(jobData.maxSalary)) {
        error = "Min Salary must be less than Max Salary";
      } else {
        setErrors((prev) => ({ ...prev, maxSalary: "" }));
      }
    }
    if (name === "maxSalary" && jobData.minSalary) {
      if (parseInt(value) <= parseInt(jobData.minSalary)) {
        error = "Max Salary must be greater than Min Salary";
      } else {
        setErrors((prev) => ({ ...prev, minSalary: "" }));
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !jobData.skills.includes(skillInput.trim())) {
      setJobData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) return;
    try {
      const response = await axiosPrivate.post("/job/add", jobData);
      console.log(response.data);
      setJobData({
        title: "",
        location: "",
        experience: "",
        minSalary: "",
        maxSalary: "",
        skills: [],
        responsibilities: "",
        description: "",
      });
      setErrors({});
      Swal.fire({
              title: "job posted successfully...",
              icon: "success",
              draggable: true,
            });
    } catch (error) {
      console.error(error);
      Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-4 px-16 bg-white shadow-md rounded-lg overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Post a New Job
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Job Title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience (Years)
          </label>
          <input
            type="number"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter experience in years"
            required
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Salary
            </label>
            <input
              type="number"
              name="minSalary"
              value={jobData.minSalary}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Min Salary"
              required
            />
            {errors.minSalary && (
              <p className="text-red-500 text-sm">{errors.minSalary}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Salary
            </label>
            <input
              type="number"
              name="maxSalary"
              value={jobData.maxSalary}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Max Salary"
              required
            />
            {errors.maxSalary && (
              <p className="text-red-500 text-sm">{errors.maxSalary}</p>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-orange-600 text-white px-3 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {jobData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-md flex items-center"
              >
                {skill}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="List job responsibilities..."
            required
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Describe the job role..."
            required
          ></textarea>
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
