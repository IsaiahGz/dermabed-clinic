import React, { useState } from 'react';
import { QUERY_TESTIMONIALS } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_TESTIMONIAL } from '../utils/mutations';

const Testimonials = () => {
  const { data } = useQuery(QUERY_TESTIMONIALS);
  const testimonials = data?.testimonials || [];
  const [addTestimonial] = useMutation(ADD_TESTIMONIAL);
  const [testimonialText, setTestimonialText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddTestimonial = async (event) => {
    event.preventDefault();
    try {
      await addTestimonial({
        variables: {
          testimonialText: testimonialText,
        },
      });
      setTestimonialText('');
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container mx-auto px-4 bg-blue-100 mt-5'>
      <h1 className='text-4xl font-bold mb-4 text-gray-800'>Testimonials</h1>
      {Auth.loggedIn() &&
        (!isSubmitted ? (
          <form onSubmit={handleAddTestimonial} className='add-testimonial-form mb-6'>
            <textarea
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
              placeholder='Add your testimonial here...'
              className='w-full h-60 px-3 py-2 mb-4 border rounded text-lg text-gray-700 resize-none focus:outline-none focus:shadow-outline'
            />
            <button
              type='submit'
              className='px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline'
            >
              Add Testimonial
            </button>
          </form>
        ) : (
          <p className='text-lg text-green-700 text-bold'>Your testimonial has been submitted for review.</p>
        ))}

      {testimonials.map((testimonial, index) => (
        <div key={index} className='bg-white shadow rounded-lg p-6 mb-4'>
          <h2 className='text-2xl font-bold mb-2 text-gray-800'>{testimonial?.user?.fullName}</h2>
          <p className='text-lg text-bold mb-2 text-gray-700'>"{testimonial.testimonialText}"</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
