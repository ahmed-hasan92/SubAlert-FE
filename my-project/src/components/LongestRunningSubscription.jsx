import React, { useMemo } from 'react';
import clockIcon from '../assets/clockIcon.svg';
import useSubscription from '../hooks/useSubscription';

const LongestRunningSubscription = () => {
  const { allSubscriptions, isLoading } = useSubscription();

  const longestRunning = useMemo(() => {
    if (!allSubscriptions) return null;

    // Find the subscription with the earliest start date
    return allSubscriptions.reduce((longest, sub) =>
      new Date(sub.startDate) < new Date(longest?.startDate || Infinity)
        ? sub
        : longest,
    );
  }, [allSubscriptions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-lg font-robotoFlex">
      {/* Header */}
      <div className="flex items-center w-full gap-2 h-fit">
        <img src={clockIcon} alt="clock" className="w-6 h-6" />
        <h1 className="text-lg font-semibold text-blue-600">
          Longest-Running Subscription
        </h1>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        The subscription that has been active the longest.
      </p>

      {/* Subscription Details */}
      {longestRunning ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 mt-4">
          <span className="text-4xl font-bold text-blue-600">
            {longestRunning.name}
          </span>
          <p className="text-sm text-gray-600 ">
            Started on:{' '}
            <span className="font-medium text-gray-700">
              {new Date(longestRunning.startDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Duration:{' '}
            <span className="font-medium text-gray-700">
              {Math.floor(
                (new Date() - new Date(longestRunning.startDate)) /
                  (1000 * 60 * 60 * 24 * 30),
              )}{' '}
              months
            </span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No subscriptions found.</p>
      )}
    </div>
  );
};

export default LongestRunningSubscription;
