import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import UserTestimonials from './UserTestimonials';
import OrderHistory from './OrderHistory';

const Me = () => {
  // Make sure the user is logged in before displaying the page
  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='container mx-auto px-4 mt-5 flex flex-wrap'>
      <div className='w-full lg:w-1/2'>
        <UserTestimonials />
      </div>
      <div className='w-full lg:w-1/2'>
        <OrderHistory />
      </div>
    </div>
  );
};

export default Me;
