import React, { useState } from 'react';
import UpperHeader from './UpperHeader';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSideBarFullView, setIsSideBarFullView] = useState(false);

  const handleFullViewSideBar = () => {
    setIsSideBarFullView(true);
  };

  const handleExistFullViewSideBar = () => {
    setIsSideBarFullView(false);
  };
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden ">
      <header className="w-full h-16 py-2 bg-gray-100 border-b border-gray-300">
        <UpperHeader />
      </header>
      <div className="flex flex-1">
        <div
          onMouseEnter={handleFullViewSideBar}
          onMouseLeave={handleExistFullViewSideBar}
          className={`hidden lg:block bg-gray-100 border-r border-gray-300 min-h-full overflow-y-auto  ${
            isSideBarFullView ? 'w-64' : 'w-16'
          }`}
        >
          <Sidebar isSideBarFullView={isSideBarFullView} />
        </div>
        <div className="flex flex-1 bg-slate-200">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
