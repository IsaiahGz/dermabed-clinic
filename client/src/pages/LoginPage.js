import React from 'react';

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-1/2 bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-8'>Login</h2>
        <form>
          <label htmlFor='login-email' className='block text-sm mb-2'>
            Email:
          </label>
          <input type='email' id='login-email' className='w-full mb-4 p-2 border rounded' />

          <label htmlFor='login-password' className='block text-sm mb-2'>
            Password:
          </label>
          <input type='password' id='login-password' className='w-full mb-4 p-2 border rounded' />

          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
            Login
          </button>
        </form>
      </div>
      <div className='w-1/2 bg-white p-8 rounded-lg shadow-md ml-8'>
        <h2 className='text-2xl font-bold mb-8'>Sign Up</h2>
        <form>
          <label htmlFor='signup-firstname' className='block text-sm mb-2'>
            First Name:
          </label>
          <input type='text' id='signup-firstname' className='w-full mb-4 p-2 border rounded' />

          <label htmlFor='signup-lastname' className='block text-sm mb-2'>
            Last Name:
          </label>
          <input type='text' id='signup-lastname' className='w-full mb-4 p-2 border rounded' />

          <label htmlFor='signup-email' className='block text-sm mb-2'>
            Email:
          </label>
          <input type='email' id='signup-email' className='w-full mb-4 p-2 border rounded' />

          <label htmlFor='signup-password' className='block text-sm mb-2'>
            Password:
          </label>
          <input type='password' id='signup-password' className='w-full mb-4 p-2 border rounded' />

          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
