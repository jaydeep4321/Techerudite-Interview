import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <a
        href="/admin/register"
        className=" bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"
      >
        Admin Registration
      </a>

      <a
        href="/customer/register"
        className=" bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"
      >
        Customer Registration
      </a>

      <a
        href="/login"
        className=" bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"
      >
        Admin Login
      </a>
    </div>
  );
};

export default Home;
