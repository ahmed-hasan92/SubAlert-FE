import { instance } from '.';

const addSubscription = async (name, image, startDate, expiryDate, amount) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('startDate', startDate);
  formData.append('expiryDate', expiryDate);
  formData.append('amount', amount);

  // Check if image is a File or a URL (string)
  if (image instanceof File) {
    formData.append('image', image);
  } else if (typeof image === 'string') {
    formData.append('imageUrl', image); // Use a different field for URLs
  }

  const response = await instance.post('/subscription', formData);
  return response.data;
};
export { addSubscription };
