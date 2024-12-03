import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import compareIcon from '../assets/compare.svg';
import useSubscription from '../hooks/useSubscription';

const ActiveAndExpired = () => {
  const { allSubscriptions, isLoading } = useSubscription();

  // Prepare data for the BarChart
  const chartData = useMemo(() => {
    if (!allSubscriptions) return [];
    const activeCount = allSubscriptions.filter(
      (sub) => sub.status === 'active',
    ).length;
    const expiredCount = allSubscriptions.filter(
      (sub) => sub.status === 'expired',
    ).length;

    return [
      { name: 'Active', count: activeCount },
      { name: 'Expired', count: expiredCount },
    ];
  }, [allSubscriptions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 px-6 py-4 overflow-hidden bg-white rounded-lg shadow-lg font-robotoFlex">
      {/* Header */}
      <div className="flex flex-col w-full gap-1 h-fit">
        <div className="flex items-center gap-2 w-fit h-fit">
          <img src={compareIcon} alt="compare" className="w-6 h-6" />
          <h1 className="text-lg font-bold text-blue-600">
            Active vs. Expired
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Comparison between the active and the expired subscriptions
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4A90E2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveAndExpired;
