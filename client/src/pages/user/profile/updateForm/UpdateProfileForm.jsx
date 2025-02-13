import React, { useContext, useEffect, useState } from "react";
import UpdateSkills from "./UpdateSkills";
import UpdateExperience from "./UpdateExperience";
import UpdateResume from "./UpdateResume";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import UserContext from "../../../../context/UserContext";
import BgBlurSpinner from "../../../../components/spinners/BgBlurSpinner";

const UpdateProfileForm = ({ setUpdate, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { fetchUserData } = useContext(UserContext);

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

  useEffect(() => {
    if (userData?.profile) {
      setSkills(userData.profile.skills || []);
      setExperience(
        userData.profile.experience || [{ companyName: "", years: "" }]
      );
    }
  }, [userData]);

  // validate skills
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

  const handleUpdate = async () => {
    const isExperienceValid = validateExperience();
const isSkillsValid = validateSkills();

if (!isExperienceValid || !isSkillsValid) {
  return; // Stop execution if either one is invalid
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
      setIsLoading(true);
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
      setUpdate(false);
    } catch (error) {
      console.log("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setIsLoading(false);
      fetchUserData();
    }
  };
  return (
    <div className="relative">
      {/* Loading spinner */}
      {isLoading && (
        <BgBlurSpinner/>
      )}

      <div>
        <UpdateSkills
          skills={skills}
          setSkills={setSkills}
          skillErrors={skillErrors}
          setSkillErrors={setSkillErrors}
        />
        <UpdateExperience
          experience={experience}
          setExperience={setExperience}
          experienceErrors={experienceErrors}
          setExperienceErrors={setExperienceErrors}
        />

        <UpdateResume
          setResume={setResume}
          resumeUploadError={resumeUploadError}
          setResumeUploadError={setResumeUploadError}
        />
        <div className="text-center mt-6">
          <button
            className={`${
              resumeUploadError||skillErrors?.some(error => error.trim() !== "")
                ? "bg-orange-200 cursor-not-allowed"
                : "bg-orange-400  hover:bg-orange-500"
            } text-white px-4 py-2 rounded-lg mr-2`}
            onClick={handleUpdate}
            disabled={resumeUploadError||skillErrors.some(error => error.trim() !== "")}
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
    </div>
  );
};

export default UpdateProfileForm;
