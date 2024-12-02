import React, { useState } from 'react';
import UpperHeader from './UpperHeader';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSideBarFullView, setIsSideBarFullView] = useState(false);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false); // For mobile sidebar visibility

  const handleFullViewSideBar = () => {
    setIsSideBarFullView(true);
  };

  const handleExistFullViewSideBar = () => {
    setIsSideBarFullView(false);
  };

  const handleOnClickFullViewSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible); // Toggle visibility on smaller screens
  };

  const handleCloseMobileSidebar = () => {
    setIsSideBarVisible(false); // Close sidebar on smaller screens
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <header className="sticky top-0 z-30 w-full h-16 py-2 bg-gray-100 border-b border-gray-300">
        <UpperHeader
          handleOnClickFullViewSideBar={handleOnClickFullViewSideBar}
        />
      </header>
      <div className="flex flex-1 overflow-y-hidden">
        {/* Sidebar for large screens */}
        <div
          onMouseEnter={handleFullViewSideBar}
          onMouseLeave={handleExistFullViewSideBar}
          className={`hidden lg:block bg-gray-100 border-r border-gray-300 min-h-full overflow-y-auto ${
            isSideBarFullView ? 'w-64' : 'w-16'
          }`}
        >
          <Sidebar isSideBarFullView={isSideBarFullView} />
        </div>

        {/* Mobile Sidebar */}
        {isSideBarVisible && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={handleCloseMobileSidebar} // Close sidebar when clicking on overlay
          >
            <div
              className="absolute top-16 w-64 h-[calc(100%-4rem)] bg-gray-100 border-r border-gray-300"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
            >
              <Sidebar isSideBarFullView={true} />
            </div>
          </div>
        )}

        <div className="flex flex-1 bg-slate-200">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
