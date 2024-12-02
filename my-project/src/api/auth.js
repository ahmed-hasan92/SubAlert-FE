import { jwtDecode } from 'jwt-decode';
import { instance } from '.';

const register = async ({ email, password, firstName, lastName }) => {
  const response = await instance.post('/user/register', {
    email,
    password,
    firstName,
    lastName,
  });
  storeToken(response.data?.token);
  return response.data;
};

const login = async ({ email, password }) => {
  const response = await instance.post('/user/login', {
    email,
    password,
  });
  storeToken(response.data?.token);
  return response.data;
};

const myData = async () => {
  const response = await instance.get('/user/mydata');
  return response.data;
};

const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const checkToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      return false;
    }
    return true;
  }

  return false;
};

export { checkToken, register, login, myData };
