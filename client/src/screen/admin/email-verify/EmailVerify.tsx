import React from 'react';
import useEmailVerify from './useEmailVerify';

const EmailVerify = () => {
  const { errors, handleSubmit, onSubmit, register } = useEmailVerify();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-black p-8 rounded-lg shadow-lg w-96 text-sm mx-auto"
    >
      <h1 className=" text-2xl font-semibold text-center mb-4">
        Email Verify OTP
      </h1>
      <p className="text-center mb-6">
        Enter the 6-digit code sent to your email id.
      </p>
      <div className="flex justify-between mb-8">
        <input
          type="number"
          required
          className="w-full h-12 border border-black text-black text-center text-xl rounded-md"
          {...register('otp')}
        />
        <p className="text-red-500">{errors.otp?.message?.toString()}</p>
      </div>
      <button
        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"
      >
        Verify
      </button>
    </form>
  );
};

export default EmailVerify;
