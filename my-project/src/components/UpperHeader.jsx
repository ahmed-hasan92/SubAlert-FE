import React, { useState } from 'react';
import menuIcon from '../assets/menu.svg';
import logo from '../assets/logo.svg';
import UpperHeaderSearchBar from './UpperHeaderSearchBar';
import Notification from './Notification';
import ProfileList from './ProfileList';
import NewSubscription from './NewSubscription';

const UpperHeader = ({ handleOnClickFullViewSideBar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // To track the dropdown list state (Notification and Profile list)

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div className="flex items-center justify-between w-full h-full px-4">
      <div className="flex items-center h-full gap-4 w-fit">
        <button onClick={handleOnClickFullViewSideBar} className="lg:hidden">
          <img src={menuIcon} alt="menu" sizes={16} />
        </button>
        <div className="flex items-center h-full gap-2 w-fit">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold tracking-wide text-gray-800 font-robotoFlex">
            SubAlert
          </h1>
        </div>
        <div className="items-center hidden h-full ml-16 lg:flex w-fit">
          <UpperHeaderSearchBar />
        </div>
      </div>
      <div className="relative flex items-center h-full gap-6 w-fit">
        <Notification
          isOpen={activeDropdown === 'notifications'}
          toggleDropdown={() => toggleDropdown('notifications')}
        />
        <NewSubscription />
        <ProfileList
          isOpen={activeDropdown === 'profile'}
          toggleDropdown={() => toggleDropdown('profile')}
        />
      </div>
    </div>
  );
};

export default UpperHeader;
