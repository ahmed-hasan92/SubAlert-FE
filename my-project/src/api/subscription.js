import { instance } from '.';

const addSubscription = async (name, image, startDate, expiryDate, amount) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('startDate', startDate);
  formData.append('expiryDate', expiryDate);
  formData.append('amount', amount);
  if (image !== null && image !== undefined) {
    formData.append('image', image);
  }

  const response = await instance.post('/subscription', formData);
  return response.data;
};

export { addSubscription };
