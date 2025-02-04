import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import UserContext from "../../context/UserContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { userData, fetchUserData } = useContext(UserContext);

  const axiosPrivate = useAxiosPrivate();

  const [update, setUpdate] = useState(false);
  const [skills, setSkills] = useState(userData?.profile?.skills || []);
  const [skillErrors, setSkillErrors] = useState([]);

  const [experience, setExperience] = useState(
    userData?.profile?.experience || [{ companyName: "", years: "" }]
  );
  const [experienceErrors, setExperienceErrors] = useState(
    experience.map(() => ({ companyName: "", years: "" })) // Initialize errors for each experience
  );
  const [resume, setResume] = useState(null);
  const [resumeUploadError, setResumeUploadError] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData?.profile) {
      setSkills(userData.profile.skills || []);
      setExperience(
        userData.profile.experience || [{ companyName: "", years: "" }]
      );
    }
  }, [userData]);

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

  const validateSkills = () => {
    let isValid = true;
    const newSkillErrors = skills.map((skill) =>
      skill.trim() ? "" : "Skill cannot be empty"
    );

    if (newSkillErrors.some((error) => error)) {
      isValid = false;
    }

    setSkillErrors(newSkillErrors);
    return isValid;
  };

  //experenice handlers
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);

    const newExperienceErrors = [...experienceErrors];
    newExperienceErrors[index][field] = value.trim() ? "" : `${field} cannot be empty`
    setExperienceErrors(newExperienceErrors);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { companyName: "", years: "" }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    const updatedExperienceErrors = experienceErrors.filter((_, i) => i !== index);
    setExperienceErrors(updatedExperienceErrors);
  };

  // Validation for experience entries
  const validateExperience = () => {
    let isValid = true;
    const newExperienceErrors = experience.map(() => ({
      companyName: "",
      years: "",
    }));

    experience.forEach((exp, index) => {
      let errors = { companyName: "", years: "" };

      // Validate company name
      if (!exp?.companyName?.trim()) {
        errors.companyName = "Company name is required";
        isValid = false;
      }

      // Validate years (must be at least 1)
      if (!exp?.years || exp.years.toString().trim() === "") {
        errors.years = "Years are required";
        isValid = false;
      } else if (parseInt(exp.years, 10) < 1) {
        errors.years = "Minimum years should be 1";
        isValid = false;
      }

      newExperienceErrors[index] = errors;
    });

    setExperienceErrors(newExperienceErrors);
    return isValid;
  };

  //resume handlers
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file.type);
      if (file.type !== "application/pdf") {
        setResumeUploadError("Please upload a valid PDF file.");
      } else if (file.size > 5 * 1024 * 1024) {
        setResumeUploadError("file size should not exceed 5MB..");
      } else {
        setResumeUploadError("");
        setResume(file);
      }
    } else {
      setResumeUploadError("");
    }
  };
  const handleReset = () => {
    setResume(null);
    setResumeUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async () => {
    if (!validateExperience() || !validateSkills()) {
      return;
    }
    const updatedData = {};

    if (
      JSON.stringify(userData?.profile?.skills || []) !== JSON.stringify(skills)
    ) {
      updatedData.skills = skills;
    }

    if (
      JSON.stringify(userData?.profile?.experience || []) !==
      JSON.stringify(experience)
    ) {
      updatedData.experience = experience;
    }

    if (resume) {
      updatedData.resume = resume;
    }

    if (Object.keys(updatedData).length === 0) {
      Swal.fire({
        title: "No Changes Detected",
        icon: "info",
        text: "You haven't changed anything.",
      });
      return;
    }
    try {
      await axiosPrivate.post(
        "http://localhost:3500/user/updateProfile",
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Updated...",
        icon: "success",
        draggable: true,
      });
      fetchUserData();
      setUpdate(false);
    } catch (error) {
      console.log("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
      {!update ? (
        <>
          <div className="mb-4">
            <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
          </div>

          <div className="mb-4">
            {userData?.profile?.skills?.length > 0 && (
              <>
                <strong>Skills:</strong> {userData?.profile?.skills?.join(", ")}
              </>
            )}
          </div>

          <div className="mb-4">
            {userData?.profile?.experience?.length > 0 && (
              <>
                <strong>Experience:</strong>
                {userData?.profile?.experience?.map((exp, index) => (
                  <div key={index}>
                    {exp.companyName} - {exp.years} years
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mb-4">
            {userData?.profile?.resume_Url && (
              <>
                <strong>Resume: </strong>

                {userData?.profile?.resume_Url
                  .split("/")
                  .pop()
                  .split("-")
                  .slice(1)
                  .join("-")}
                <a
                  href={userData?.profile?.resume_Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  ( <span className="underline text-blue-700">view</span> )
                </a>
              </>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
              onClick={() => setUpdate(true)}
            >
              Update Profile
            </button>
          </div>
        </>
      ) : (
        <div>
          <div>
            <label className="block mb-2">Skills:</label>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="mb-2 flex items-center gap-2 group relative"
              >
                <div className="flex-1">
                  {skillErrors[index] && (
                    <span className="text-red-600 text-sm">
                      {skillErrors[index]}
                    </span>
                  )}
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                </div>

                {/* Remove button visibility: Show only when there's more than one skill or if skill has data */}
                {(skills.length > 1 ||
                  (skills.length === 1 && skill.trim())) && (
                  <button
                    className="opacity-0 group-hover:opacity-100 bg-slate-200 text-gray-600 text-sm w-7 h-7 rounded-full  hover:text-gray-700
                hover:bg-slate-300 hover:scale-110 transition-all duration-200 ease-in-out 
                flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          </div>

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

              {(experience.length > 1 ||
                (experience.length === 1 &&
                  exp.companyName.trim() &&
                  exp.years.toString().trim())) && (
                <button
                  className="opacity-0 group-hover:opacity-100 bg-slate-200 text-gray-600 text-sm w-7 h-7 rounded-full  hover:text-gray-700
                           hover:bg-slate-300 hover:scale-110 transition-all duration-200 ease-in-out 
                           flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-2"
            onClick={handleAddExperience}
          >
            Add Experience
          </button>

          <label className="block mt-4 mb-2">Upload Resume:</label>
          {resumeUploadError && (
            <p className="text-red-600">{resumeUploadError}</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleResumeUpload}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 p-2 border bg-gray-300 rounded"
          >
            Clear
          </button>

          <div className="text-center mt-6">
            <button
              className={`${
                resumeUploadError
                  ? "bg-orange-200 cursor-not-allowed"
                  : "bg-orange-400  hover:bg-orange-500"
              } text-white px-4 py-2 rounded-lg mr-2`}
              onClick={handleUpdate}
              disabled={resumeUploadError}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setUpdate(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
