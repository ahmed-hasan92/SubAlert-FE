import React, { useState } from 'react';
import newSubscriptionIcon from '../assets/addNew.svg';
import closeIcon from '../assets/close.svg';

import amazonLogo from '../assets/amazonPrimelogo.png';
import youTube from '../assets/youtubeLogo.png';
import netFlix from '../assets/netflixLogo.png';
import spotify from '../assets/spotifyLogo.webp';

import useSubscription from '../hooks/useSubscription';

const predefinedSubscriptions = [
  { name: 'YouTube Premium', image: youTube },
  { name: 'Netflix', image: netFlix },
  { name: 'Amazon Prime', image: amazonLogo },
  { name: 'Spotify', image: spotify },
];

const NewSubscription = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState('');
  const [subscriptionImage, setSubscriptionImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [amount, setAmount] = useState('');

  const { addNewSubscription } = useSubscription();

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    setSubscriptionName('');
    setSubscriptionImage(null);
    setCustomImage(null);
    setSuggestions([]);
    setStartDate('');
    setExpiryDate('');
    setAmount('');
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setSubscriptionName(inputName);

    if (inputName.trim() === '') {
      setSuggestions([]);
      setSubscriptionImage(null);
      return;
    }

    const matchedSubscriptions = predefinedSubscriptions.filter((sub) =>
      sub.name.toLowerCase().startsWith(inputName.toLowerCase()),
    );

    setSuggestions(matchedSubscriptions);

    const exactMatch = matchedSubscriptions.find(
      (sub) => sub.name.toLowerCase() === inputName.toLowerCase(),
    );

    if (exactMatch) {
      setSubscriptionImage(exactMatch.image);
    } else {
      setSubscriptionImage(null);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSubscriptionName(suggestion.name);
    setSubscriptionImage(suggestion.image);
    setSuggestions([]);
  };

  const handleImageChange = (e) => {
    setCustomImage(e.target.files[0]);
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);

    if (expiryDate && new Date(selectedDate) >= new Date(expiryDate)) {
      setExpiryDate('');
    }
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const image = customImage || subscriptionImage;

    addNewSubscription(
      {
        name: subscriptionName,
        image,
        startDate,
        expiryDate,
        amount,
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      },
    );
  };

  return (
    <>
      <button onClick={handleOpenModal}>
        <img src={newSubscriptionIcon} alt="newSub" className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-black bg-opacity-50 transition-opacity duration-500 ${
          isModalOpened ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="w-full bg-white md:w-[32rem] h-fit flex flex-col rounded-lg drop-shadow-xl p-4">
          <div className="flex items-center justify-between w-full h-fit">
            <h1 className="font-semibold text-blue-600 font-robotoFlex">
              + New subscription
            </h1>
            <button
              onClick={handleCloseModal}
              className="absolute text-gray-600 top-4 right-4"
            >
              <img
                src={closeIcon}
                alt="close"
                className="w-6 h-6 hover:scale-105"
              />
            </button>
          </div>
          <form
            className="relative flex flex-col flex-1 gap-5 px-1 mt-5"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Subscription Name"
              type="text"
              value={subscriptionName}
              onChange={handleNameChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-md outline-none h-fit"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md top-14 max-h-40">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
            {subscriptionImage ? (
              <div className="flex items-center gap-2">
                <img
                  src={subscriptionImage}
                  alt="Subscription"
                  className="w-12 h-12 rounded"
                />
                <span className="text-sm font-medium text-gray-600">
                  Auto-detected image
                </span>
              </div>
            ) : (
              <input
                placeholder="Upload custom image"
                type="file"
                onChange={handleImageChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-md outline-none h-fit"
              />
            )}
            <div className="flex items-center justify-between w-full h-fit">
              <input
                placeholder="Starting date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-[45%] px-2 py-2 border border-gray-300 rounded-md outline-none h-fit"
                required
              />
              <input
                placeholder="Expire date"
                type="date"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                min={
                  startDate
                    ? new Date(new Date(startDate).getTime() + 86400000)
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                className="w-[45%] px-2 py-2 border border-gray-300 rounded-md outline-none h-fit"
                required
              />
            </div>
            <input
              placeholder="Price"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-md outline-none h-fit"
              required
            />
            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-blue-500 rounded-md shadow-md h-fit font-robotoFlex hover:bg-blue-600 shadow-gray-300"
            >
              Add subscription
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSubscription;