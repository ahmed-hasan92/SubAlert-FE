import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../api/auth';
import UserContext from '../../context/UserContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['REGISTER'],
    mutationFn: () => register(registerInfo),
    onSuccess: () => {
      setUser(true);
      navigate('/dashboard');
      toast.success(`Thank you for registering ${registerInfo.firstName}`);
    },
    onError: (error) => {
      toast.error(`${error.response.data}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({
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
      <div className="flex flex-col justify-center w-full h-full px-4 py-6 bg-white rounded-lg md:w-96 md:h-fit drop-shadow-2xl font-robotoFlex">
        <div className="flex items-center w-full space-x-2 h-fit">
          <img src={logo} alt="logo" className="w-7 h-7" />
          <h1 className="text-xl font-bold tracking-wide text-gray-800">
            SubAlert
          </h1>
        </div>
        <div className="flex flex-col w-full mt-8 h-fit ">
          <h1 className="text-[1rem] text-gray-800 font-semibold ">
            Register now
          </h1>
          <p className="text-sm text-gray-600">
            Create your account and start manage your subscriptions!
          </p>
        </div>
        <form
          onSubmit={handleFormSubmission}
          className="flex flex-col w-full gap-5 mt-8 h-fit"
        >
          <div className="flex items-center w-full gap-4 h-fit ">
            <div className="flex flex-col w-1/2 h-fit">
              <input
                type="text"
                name="firstName"
                value={registerInfo.firstName}
                onChange={handleChange}
                required
                className="w-full px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md outline-none placeholder:text-sm placeholder:text-gray-600"
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col w-1/2 h-fit">
              <input
                type="text"
                name="lastName"
                value={registerInfo.lastName}
                onChange={handleChange}
                required
                className="w-full px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md outline-none placeholder:text-sm placeholder:text-gray-600"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-fit">
            <input
              type="email"
              name="email"
              value={registerInfo.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md outline-none placeholder:text-sm placeholder:text-gray-600"
              placeholder="Email address"
            />
          </div>
          <div className="flex flex-col w-full h-fit">
            <input
              type="password"
              name="password"
              value={registerInfo.password}
              onChange={handleChange}
              required
              className="w-full px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md outline-none placeholder:text-sm placeholder:text-gray-600"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#017ef4] text-white text-[0.9rem] rounded-md shadow-md shadow-gray-300 font-semibold hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-3 text-sm tracking-wide text-gray-700">
          Have an account already?{' '}
          <span>
            <NavLink className="text-[#017ef4] font-medium" to="/">
              Login
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
