import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full p-6 overflow-y-auto ">
      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-4 md:grid-cols-2 h-fit ">
        <div className="bg-gray-100 rounded-lg h-52 drop-shadow-lg "></div>
        <div className="bg-gray-100 rounded-lg h-52 drop-shadow-lg "></div>
        <div className="bg-gray-100 rounded-lg h-52 drop-shadow-lg "></div>
        <div className="bg-gray-100 rounded-lg h-52 drop-shadow-lg "></div>
      </div>
    </div>
  );
};

export default Dashboard;
