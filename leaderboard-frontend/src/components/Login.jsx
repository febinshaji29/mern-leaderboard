
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // Implement login logic here
    // useStore.getState().login(false); // Temporary placeholder
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <input
              {...register('username', { required: true })}
              type="text"
              id="username"
              className={`block w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">Username is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              id="password"
              className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">Password is required</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
