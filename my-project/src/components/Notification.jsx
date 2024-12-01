import React from 'react';
import notificationIcon from '../assets/Notifications.svg';
const Notification = () => {
  return (
    <>
      <div className="relative">
        <button className="flex items-center justify-center ">
          <img src={notificationIcon} alt="notification" className="w-6 h-6" />
        </button>
        {/** Ping Dot */}
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default Notification;
