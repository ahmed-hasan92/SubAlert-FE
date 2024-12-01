import React from 'react';
import profileImage from '../assets/profile.webp';
const ProfileList = () => {
  return (
    <>
      <button className="border border-gray-400 rounded-full shadow-md w-9 h-9 shadow-gray-400 ">
        <img
          src={profileImage}
          alt="profileImage"
          className="object-cover w-full h-full rounded-full"
        />
      </button>
    </>
  );
};

export default ProfileList;
