import React from 'react';
import searchIcon from '../assets/search.svg';
const UpperHeaderSearchBar = () => {
  return (
    <>
      <div className="flex items-center gap-2 px-2 bg-gray-200 border border-gray-300 rounded-lg h-fit w-fit">
        <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search by subscription name..."
          className="px-2 py-1.5 bg-transparent outline-none w-80  "
        />
      </div>
    </>
  );
};

export default UpperHeaderSearchBar;
