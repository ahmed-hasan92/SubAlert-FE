import React, { useMemo } from 'react';
import expireCalendarIcon from '../assets/expireCalendar.svg';
import useSubscription from '../hooks/useSubscription';

const ExpireSoon = () => {
  const { allSubscriptions, isLoading } = useSubscription();
  const currentDate = new Date();

  const upcomingSevenDays = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
  );

  const subscriptionsData = useMemo(() => {
    if (!allSubscriptions) return 0; // Default to 0 if no subscriptions

    const expireInSevenDays = allSubscriptions.filter((sub) => {
      const expiryDate = new Date(sub.expiryDate); // Ensure expiryDate is a Date object
      return expiryDate >= currentDate && expiryDate <= upcomingSevenDays;
    }).length;

    return expireInSevenDays;
  }, [allSubscriptions, currentDate, upcomingSevenDays]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-lg font-robotoFlex">
      {/* Header */}
      <div className="flex flex-col w-full gap-1 h-fit">
        <div className="flex items-center w-full gap-2 h-fit">
          <img src={expireCalendarIcon} alt="expireIcon" className="w-6 h-6" />
          <h1 className="text-lg font-semibold text-blue-600">Expire Soon</h1>
        </div>
        <p className="text-sm text-gray-500">
          Count of subscriptions expiring in the next 7 days
        </p>
      </div>
      {/* Count */}
      <div className="flex flex-col items-center justify-center flex-1 gap-1">
        <h1 className="mt-4 font-bold text-blue-600 text-8xl">
          {subscriptionsData}
        </h1>
        <p className="text-sm text-gray-600 ">
          You have {subscriptionsData} subscriptions will expire in seven days
        </p>
      </div>
    </div>
  );
};

export default ExpireSoon;
