import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useSubscription from '../hooks/useSubscription';

const MyLineChart = () => {
  const { allSubscriptions, isLoading } = useSubscription();

  // Transform API response for chart data
  const chartData = useMemo(() => {
    if (!allSubscriptions) return [];
    const spendingByMonth = {};

    allSubscriptions.forEach((sub) => {
      const month = new Date(sub.startDate).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      spendingByMonth[month] = (spendingByMonth[month] || 0) + sub.amount;
    });

    return Object.entries(spendingByMonth).map(([month, spending]) => ({
      month,
      spending,
    }));
  }, [allSubscriptions]);

  // Calculate metrics
  const totalSpending = allSubscriptions?.reduce(
    (sum, sub) => sum + sub.amount,
    0,
  );

  const activeSubscriptions = allSubscriptions?.filter(
    (sub) => sub.status === 'active',
  ).length;

  const expiringSoon = allSubscriptions?.filter(
    (sub) => sub.notificationsSent?.expiringSoon,
  ).length;

  const mostExpensiveSubscription = allSubscriptions?.reduce((max, sub) =>
    sub.amount > (max?.amount || 0) ? sub : max,
  );

  const earliestExpiry = allSubscriptions?.reduce((earliest, sub) =>
    new Date(sub.expiryDate) < new Date(earliest?.expiryDate || Infinity)
      ? sub
      : earliest,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-100 rounded-lg shadow-lg">
      {/** Header */}
      <div className="flex items-center justify-between w-full px-4 pb-4 border-b font-robotoFlex">
        <div>
          <h1 className="text-xl font-bold text-blue-600">
            Subscription Summary
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your subscriptions and spending
          </p>
        </div>
        <div className="text-right font-robotoFlex">
          <p className="text-gray-700 ">
            Total Spending:{' '}
            <span className="font-bold text-blue-600">${totalSpending}</span>
          </p>
        </div>
      </div>

      {/** Chart */}
      <div className="flex-1 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spending" stroke="#4A90E2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/** Footer */}
      <div className="flex items-center justify-between px-4 pt-4 border-t font-robotoFlex">
        <div>
          <p className="text-gray-700">
            Most Expensive Subscription:{' '}
            <span className="font-bold text-blue-600">
              {mostExpensiveSubscription?.name || 'N/A'} ($
              {mostExpensiveSubscription?.amount || 0})
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-700">
            Earliest Expiry:{' '}
            <span className="font-bold text-blue-600">
              {earliestExpiry
                ? new Date(earliestExpiry.expiryDate).toLocaleDateString()
                : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyLineChart;
