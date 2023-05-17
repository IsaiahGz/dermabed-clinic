import React from 'react';
import { QUERY_TESTIMONIALS } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_TESTIMONIAL } from '../utils/mutations';

const Testimonials = () => {
  const { data } = useQuery(QUERY_TESTIMONIALS);
  const testimonials = data?.testimonials || [];
  const [addTestimonial] = useMutation(ADD_TESTIMONIAL);

  const handleAddTestimonial = async (event) => {
    try {
      await addTestimonial({
        variables: {
          testimonialText: event.target.value,
          userId: Auth.getProfile().data._id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>Testimonials</h1>
      {Auth.loggedIn() && (
        <button onClick={handleAddTestimonial} className='add-testimonial-button '>
          Add Testimonial
        </button>
      )}

      {testimonials.map((testimonial, index) => (
        <div key={index} className='bg-white shadow rounded-lg p-6 mb-4'>
          <h2 className='text-2xl font-semibold mb-2'>{testimonial?.user?.fullName}</h2>
          <p className='text-lg mb-2'>"{testimonial.testimonialText}"</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
