import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import UserProfileVIew from "./UserProfileVIew";
import UpdateProfileForm from "./updateForm/UpdateProfileForm";

function Profile() {
  const { userData } = useContext(UserContext);

  const [update, setUpdate] = useState(false);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
      {!update ? (
        <UserProfileVIew userData={userData} setUpdate={setUpdate} />
      ) : (
        <UpdateProfileForm userData={userData} setUpdate={setUpdate} />
      )}
    </div>
  );
}

export default Profile;
