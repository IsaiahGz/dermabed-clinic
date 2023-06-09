import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TestimonialPanel from '../components/Admin/TestimonialPanel';
import UserPanel from '../components/Admin/UserPanel';
import Auth from '../utils/auth';

export default function Admin() {
  if (!Auth.loggedIn() || !Auth.getProfile().data.isAdmin) {
    return <Navigate to='/' />;
  }

  return (
    <div className='container mx-auto flex flex-wrap'>
      <div className='w-full md:w-1/2 p-2'>
        <TestimonialPanel />
      </div>
      <div className='w-full md:w-1/2 p-2'>
        <UserPanel />
      </div>
    </div>
  );
}
