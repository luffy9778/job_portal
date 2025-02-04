import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UpdateExperience = ({
  experience,
  setExperience,
  experienceErrors,
  setExperienceErrors,
}) => {
  //experenice handlers
  const handleExperienceChange = (index, field, value) => {
    setExperience((prevExperience) => {
      const newExperience = [...prevExperience]; // Copy the array
      newExperience[index] = { ...newExperience[index], [field]: value }; // Copy the object before modifying
      return newExperience;
    });

    setExperienceErrors((prevErrors) => {
      const newExperienceErrors = [...prevErrors];
      newExperienceErrors[index] = {
        ...newExperienceErrors[index],
        [field]: value.trim() ? "" : `${field} cannot be empty`,
      };
      return newExperienceErrors;
    });
  };

  const handleAddExperience = () => {
    setExperience([...experience, { companyName: "", years: "" }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    const updatedExperienceErrors = experienceErrors.filter(
      (_, i) => i !== index
    );
    setExperienceErrors(updatedExperienceErrors);
  };

  return (
    <>
      <label className="block mt-4 mb-2">Experience:</label>
      {experience.map((exp, index) => (
        <div key={index} className="mb-2 flex items-center gap-2 group">
          <div className="flex-1 ">
            {experienceErrors[index]?.companyName && (
              <span className="text-red-600 block">
                {experienceErrors[index].companyName}
              </span>
            )}
            <input
              type="text"
              placeholder="Company Name"
              value={exp.companyName}
              onChange={(e) =>
                handleExperienceChange(index, "companyName", e.target.value)
              }
              className="border p-2 rounded w-full mb-2"
            />
            {experienceErrors[index]?.years && (
              <span className="text-red-600 block">
                {experienceErrors[index].years}
              </span>
            )}
            <input
              type="number"
              placeholder="Years"
              min="1"
              value={exp.years}
              onChange={(e) =>
                handleExperienceChange(index, "years", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 bg-slate-200 text-gray-600 text-sm w-7 h-7 rounded-full  hover:text-gray-700
                     hover:bg-slate-300 hover:scale-110 transition-all duration-200 ease-in-out 
                     flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
            onClick={() => handleRemoveExperience(index)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-2"
        onClick={handleAddExperience}
      >
        Add Experience
      </button>{" "}
    </>
  );
};

export default UpdateExperience;
