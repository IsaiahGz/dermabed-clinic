import React, { useState } from 'react';
import Testimonial from './Testimonial';
import { useQuery } from '@apollo/client';
import { QUERY_ADMIN_TESTIMONIALS } from '../../utils/queries';

export default function TestimonialPanel() {
  const [filterDisapproved, setFilterDisapproved] = useState(true);
  const { data } = useQuery(QUERY_ADMIN_TESTIMONIALS);
  const testimonials = data.adminTestimonials;

  return (
    <div className='bg-slate-200 rounded p-2'>
      <h2 className='text-lg'>Testimonial</h2>
      <form>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox'
            checked={filterDisapproved}
            onChange={() => setFilterDisapproved(!filterDisapproved)}
          />
          <span className='ml-2'>Show only awaiting approval</span>
        </label>
      </form>
      {testimonials
        .filter((testimonial) => (filterDisapproved ? !testimonial.isApproved : true))
        .map((testimonial) => {
          return <Testimonial key={testimonial._id} testimonial={testimonial} onApprove={() => {}} />;
        })}
    </div>
  );
}
