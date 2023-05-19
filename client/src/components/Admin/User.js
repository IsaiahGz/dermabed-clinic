import React from 'react';

export default function User({ user, onSetAdmin }) {
  const handleSetAdminClick = () => {
    onSetAdmin(user._id, !user.isAdmin);
  };

  return (
    <div className='p-4 border border-gray-400 rounded-md mb-4'>
      <p className='text-lg font-bold mb-2'>
        {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Is Admin: {user.isAdmin.toString()}</p>
      {!user.isAdmin && (
        <button className='px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md' onClick={handleSetAdminClick}>
          Set as Admin
        </button>
      )}
      {user.isAdmin && (
        <button className='px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md' onClick={handleSetAdminClick}>
          Remove as Admin
        </button>
      )}
    </div>
  );
}
