import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UpdateSkills = ({ skills, setSkills, skillErrors, setSkillErrors }) => {
  //skill handlers
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);

    // Remove validation error if user types something
    const newSkillErrors = [...skillErrors];
    newSkillErrors[index] = value.trim() ? "" : "Skill cannot be empty";
    setSkillErrors(newSkillErrors);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
    setSkillErrors([...skillErrors, ""]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    const updatedSkillErrors = skillErrors.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setSkillErrors(updatedSkillErrors);
  };

  return (
    <div>
      <label className="block mb-2">Skills:</label>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="mb-2 flex items-center gap-2 group relative"
        >
          <div className="flex-1">
            {skillErrors[index] && (
              <span className="text-red-600 text-sm">{skillErrors[index]}</span>
            )}
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
          </div>

          <button
            className="opacity-0 group-hover:opacity-100 bg-slate-200 text-gray-600 text-sm w-7 h-7 rounded-full  hover:text-gray-700
                hover:bg-slate-300 hover:scale-110 transition-all duration-200 ease-in-out 
                flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
            onClick={() => handleRemoveSkill(index)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        onClick={handleAddSkill}
      >
        Add Skill
      </button>
    </div>
  );
};

export default UpdateSkills;
