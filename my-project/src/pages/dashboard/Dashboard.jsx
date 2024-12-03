import React from 'react';
import MyLineChart from '../../components/MyLineChart';
import ActiveAndExpired from '../../components/ActiveAndExpired';
import ExpireSoon from '../../components/ExpireSoon';
import LongestRunningSubscription from '../../components/LongestRunningSubscription';
import SubscriptionsTable from '../../components/SubscriptionsTable';

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full gap-5 p-4 overflow-y-auto ">
      <div className="grid w-full grid-cols-1 h-fit ">
        <div className="bg-gray-100 rounded-lg h-[32rem] drop-shadow-lg ">
          <MyLineChart />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 h-fit ">
        <div className="bg-gray-100 rounded-lg h-96 drop-shadow-lg ">
          <ActiveAndExpired />
        </div>
        <div className="bg-gray-100 rounded-lg h-96 drop-shadow-lg ">
          <ExpireSoon />
        </div>
        <div className="bg-gray-100 rounded-lg h-96 drop-shadow-lg ">
          <LongestRunningSubscription />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 h-fit ">
        <div className="bg-gray-100 rounded-lg h-[32rem] drop-shadow-lg ">
          <SubscriptionsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
