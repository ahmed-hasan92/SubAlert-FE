import React from 'react';
import tableIcon from '../assets/subTable.svg';
import defaultImage from '../assets/defaultImage.webp'; // Use a default image for missing subscription images
import useSubscription from '../hooks/useSubscription';
import { IMAGE_URL } from '../api';

const SubscriptionsTable = () => {
  const { allSubscriptions, isLoading } = useSubscription();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-lg font-robotoFlex">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-2 pb-4 border-b">
        <div className="flex items-center gap-2">
          <img src={tableIcon} alt="tableIcon" className="w-6 h-6" />
          <h1 className="text-lg font-semibold text-blue-600">
            Subscriptions Table
          </h1>
        </div>
        <h1 className="text-gray-700 ">
          Number of subscriptions:{' '}
          <span className="font-semibold text-blue-600 ">
            {allSubscriptions?.length || 0}
          </span>
        </h1>
      </div>

      {/* Conditional Content */}
      {allSubscriptions?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <p className="text-sm text-gray-500">
            No subscriptions found. Start adding your subscriptions to track
            them here.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Start Date
                </th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Expiry Date
                </th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Amount ($)
                </th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-sm text-center text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allSubscriptions?.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="w-10 h-10">
                      <img
                        src={
                          sub.image
                            ? `${IMAGE_URL + '/' + sub.image}`
                            : defaultImage
                        }
                        alt={sub.name}
                        className="object-cover w-full h-full rounded"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {sub.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(sub.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(sub.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    ${sub.amount}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${
                      sub.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;
