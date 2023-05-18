import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MY_TESTIMONIALS } from '../utils/queries';

const Me = () => {
  const { loading, data, error } = useQuery(QUERY_MY_TESTIMONIALS, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>My Testimonials</h1>
      {data.myTestimonials.map((testimonial, index) => (
        <div key={index} className='bg-white shadow rounded-lg p-6 mb-4'>
          <p className='text-lg mb-2'>"{testimonial.testimonialText}"</p>
          <p className='text-gray-500'>Posted on {new Date(parseInt(testimonial.createdAt)).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Me;
