import React, { useState } from 'react';

export default function Testimonial({ testimonial, approveTestimonial }) {
  const { user, isApproved, testimonialText, createdAt } = testimonial;

  const handleApprove = () => {
    approveTestimonial({ variables: { testimonialId: testimonial._id, isApproved: true } });
  };

  const handleDisapprove = () => {
    approveTestimonial({ variables: { testimonialId: testimonial._id, isApproved: false } });
  };

  return (
    <div className='p-4 border border-gray-400 '>
      <div className='flex justify-between'>
        <p className='text-lg font-bold mb-2'>{user.fullName}</p>

        {isApproved ? (
          <button className='px-3 py-1 text-base font-medium text-white bg-red-500 rounded-md' onClick={handleDisapprove}>
            Disapprove
          </button>
        ) : (
          <button className='px-3 py-1 text-base font-medium text-white bg-blue-500 rounded-md' onClick={handleApprove}>
            Approve
          </button>
        )}
      </div>
      <p className='text-sm text-gray-600'>Created at {createdAt}</p>
      <p className='text-gray-600'>"{testimonialText}"</p>
    </div>
  );
}
