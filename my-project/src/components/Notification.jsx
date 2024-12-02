import React from 'react';
import notificationIcon from '../assets/Notifications.svg';
import useNotification from '../hooks/useNotification';
import moment from 'moment';

const Notification = ({ isOpen, toggleDropdown }) => {
  const { myNotifications, isLoading } = useNotification();

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <img src={notificationIcon} alt="notification" className="w-6 h-6" />
      </button>
      {/** Ping Dot */}
      <div className="absolute -top-1 -right-1">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 flex flex-col w-64 p-4 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md top-full max-h-72 ">
          {myNotifications && myNotifications?.length > 0 ? (
            myNotifications?.map((notification) => (
              <div
                key={notification?._id}
                className="flex flex-col w-full gap-1 p-2 border-b border-gray-300 h-fit font-robotoFlex"
              >
                <p className="text-sm text-blue-600">{notification?.message}</p>
                <p className="text-sm text-gray-600">
                  {moment(notification?.createdAt).fromNow()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600 font-robotoFlex">
              No notifications available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
