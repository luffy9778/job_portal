import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext  from "../../../src/context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Profile() {
  const { user: loggedInUser } = useContext(AuthContext);
  const [user, setUserProfile] = useState(null);
  const [update, setUpdate] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([{ companyName: "", year: "" }]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3500/user/profile", {
          headers: { Authorization: `Bearer ${loggedInUser.token}` },
        });

        setUserProfile(response.data);
        setSkills(response.data.skills || []);
        setExperience(response.data.experience || []);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfileDetails();
  }, [loggedInUser]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { companyName: "", year: "" }]);
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("skills", JSON.stringify(skills));
      formData.append("experience", JSON.stringify(experience));
      if (resume) {
        formData.append("resume", resume);
      }

      await axios.put("http://localhost:3500/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Updated...",
        icon: "success",
        draggable: true
      });

      setUpdate(false);
    } catch (error) {
      console.log("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
      <div className="mb-4">
        <strong>First Name:</strong> {user?.firstName}
      </div>
      <div className="mb-4">
        <strong>Last Name:</strong> {user?.lastName}
      </div>
      <div className="mb-4">
        <strong>Skills:</strong> {user?.skills?.join(", ")}
      </div>
      <div className="mb-4">
        <strong>Resume:</strong>{" "}
        {user?.resume ? (
          <Link to={user.resume} target="_blank" rel="noopener noreferrer">
            Download Resume
          </Link>
        ) : (
          "No resume uploaded"
        )}
      </div>

      {update && (
        <div>
          <label className="block mb-2">Skills:</label>
          {skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleAddSkill}
          >
            Add Skill
          </button>

          <label className="block mt-4 mb-2">Experience:</label>
          {experience.map((exp, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Company Name"
                value={exp.companyName}
                onChange={(e) =>
                  handleExperienceChange(index, "companyName", e.target.value)
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Years"
                value={exp.year}
                onChange={(e) =>
                  handleExperienceChange(index, "year", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleAddExperience}
          >
            Add Experience
          </button>

          <label className="block mt-4 mb-2">Upload Resume:</label>
          <input
            type="file"
            onChange={handleResumeUpload}
            className="border p-2 rounded w-full"
          />

          <div className="text-center mt-6">
            <button
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 mr-2"
              onClick={handleUpdate}
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

      {!update && (
        <div className="text-center mt-6">
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
            onClick={() => setUpdate(true)}
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
