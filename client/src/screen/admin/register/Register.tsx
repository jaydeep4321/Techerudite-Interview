import React from 'react';
import useRegister from './useRegister';

const Register = () => {
  const { errors, handleSubmit, onSubmit, register } = useRegister();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin Registration
      </h1>
      <form
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            placeholder="First Name"
            {...register('firstname')}
          />
          <p className="text-red-500">
            {errors.firstname?.message?.toString()}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            placeholder="Last Name"
            {...register('lastname')}
          />
          <p className="text-red-500">{errors.lastname?.message?.toString()}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            placeholder="Email"
            {...register('email')}
          />
          <p className="text-red-500">{errors.email?.message?.toString()}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            placeholder="********"
            {...register('password')}
          />
          <p className="text-red-500">{errors.password?.message?.toString()}</p>
        </div>

        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Register
        </button>

        <a href="/" className="mt-5 text-sm block hover:underline">
          Back to home
        </a>
      </form>
    </div>
  );
};

export default Register;
