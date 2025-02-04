import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const UpdateResume = ({
  setResume,
  resumeUploadError,
  setResumeUploadError,
}) => {
  const fileInputRef = useRef(null);

  //resume handlers
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
  return (
    <div>
      <label className="block mt-4 mb-2">Upload Resume:</label>
      {resumeUploadError && <p className="text-red-600">{resumeUploadError}</p>}

      <div className="relative group">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleResumeUpload}
          className="border p-2 rounded w-full pr-14"
        />
        <button
          type="button"
          onClick={handleReset}
          className="text-sm w-7 h-7 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FontAwesomeIcon icon={faX}/>
        </button>
      </div>
    </div>
  );
};

export default UpdateResume;
