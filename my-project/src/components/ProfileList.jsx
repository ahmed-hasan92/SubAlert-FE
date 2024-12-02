import React from 'react';
import profileImage from '../assets/profile.webp';
import useMyProfile from '../hooks/useMyProfile';

const ProfileList = ({ isOpen, toggleDropdown }) => {
  const { profile, isLoading } = useMyProfile();

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border border-gray-400 rounded-full shadow-md w-9 h-9 shadow-gray-400"
      >
        <img
          src={profileImage}
          alt="profileImage"
          className="object-cover w-full h-full rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 transition-transform duration-500 ease-in-out transform bg-white border border-gray-300 rounded-md shadow-md h-fit min-w-52 top-full shadow-gray-400">
          <ul className="p-4">
            <li className="text-sm font-medium text-gray-700 font-robotoFlex text-wrap">
              {profile?.firstName} {profile?.lastName}
            </li>
            <li className="py-1 text-sm text-gray-600 border-b border-gray-300 text-wrap">
              {profile?.email}
            </li>
            <li className="mt-3 text-sm text-gray-600 cursor-pointer text-wrap hover:text-blue-500 hover:font-semibold">
              Profile settings
            </li>
            <li className="mt-1 text-sm text-gray-600 cursor-pointer hover:text-red-500 hover:font-semibold">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileList;
