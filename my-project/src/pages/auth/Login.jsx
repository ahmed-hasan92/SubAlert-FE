import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['LOGIN'],
    mutationFn: () => login(loginInfo),
    onSuccess: () => {
      setUser(true);
      navigate('*');
      toast.success(`Welcome back!`);
    },
    onError: (error) => {
      toast.error(`${'Wrong email or password' || error.response.data}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f5f6f8] px-4 lg:px-8 2xl:px-12 py-2 overflow-y-auto">
      <div className="w-full h-full md:w-96 md:h-fit bg-white rounded-lg drop-shadow-2xl font-robotoFlex flex flex-col px-4 justify-center py-6">
        <div className="w-full h-fit items-center flex space-x-2">
          <img src={logo} alt="logo" className="w-7 h-7" />
          <h1 className="text-xl text-gray-800 font-bold tracking-wide">
            SubAlert
          </h1>
        </div>
        <div className="w-full h-fit flex flex-col mt-8 ">
          <h1 className="text-[1rem] text-gray-800 font-semibold ">
            Login now
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back again to SubAlert!
          </p>
        </div>
        <form
          onSubmit={handleFormSubmission}
          className="mt-8 w-full h-fit flex flex-col gap-5"
        >
          <div className="h-fit w-full flex flex-col">
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 text-gray-700 text-sm placeholder:text-sm placeholder:text-gray-600 outline-none border border-gray-300 rounded-md"
              placeholder="Email address"
            />
          </div>
          <div className="h-fit w-full flex flex-col">
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 text-gray-700 text-sm placeholder:text-sm placeholder:text-gray-600 outline-none border border-gray-300 rounded-md"
              placeholder="Password"
            />
            <p className="text-[#017ef4] underline mt-1 text-sm">
              Forgot your password
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#017ef4] text-white text-[0.9rem] rounded-md shadow-md shadow-gray-300 font-semibold hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700  mt-3 text-sm tracking-wide">
          Don't have an account?{' '}
          <span>
            <NavLink className="text-[#017ef4] font-medium" to="/register">
              Register
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
