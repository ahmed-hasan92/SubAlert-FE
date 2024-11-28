import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const IMAGE_URL = 'http://localhost:8000';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export { instance, IMAGE_URL };
