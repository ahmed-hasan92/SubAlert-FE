import { instance } from '.';

const getNotifications = async () => {
  const response = await instance.get('/notification');
  return response.data;
};

export { getNotifications };
