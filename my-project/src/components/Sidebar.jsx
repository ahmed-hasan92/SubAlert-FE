import React from 'react';
import { sideBarItems } from '../constants';
import logOutIcon from '../assets/logout.svg';

const Sidebar = ({ isSideBarFullView }) => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <ul className="flex flex-col items-center py-4 space-y-2">
        {sideBarItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 px-4 py-2 w-full rounded-md hover:bg-gray-200 transition ${
              isSideBarFullView ? 'justify-start' : 'justify-center'
            }`}
          >
            <img
              src={item.itemIcon}
              alt={`${item.label} icon`}
              className="w-6 h-6"
            />
            {isSideBarFullView && (
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="px-4 py-4 mt-auto border-t border-gray-300">
        <button
          className={`flex items-center gap-2 w-full ${
            isSideBarFullView ? 'justify-start' : 'justify-center'
          } text-gray-700`}
        >
          <img src={logOutIcon} alt="logOut" className="w-6 h-6" />
          {isSideBarFullView && (
            <span className="text-sm font-medium text-gray-700">Log Out</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
