import React from 'react';
import { QUERY_TESTIMONIALS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Testimonials = () => {
	const { data } = useQuery(QUERY_TESTIMONIALS);
	const testimonials = data?.testimonials || [];

	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-4xl font-semibold mb-4'>Testimonials</h1>

			{testimonials.map((testimonial, index) => (
				<div key={index} className='bg-white shadow rounded-lg p-6 mb-4'>
					<h2 className='text-2xl font-semibold mb-2'>{testimonial.name}</h2>
					<p className='text-lg mb-2'>"{testimonial.testimonial}"</p>
					<p className='text-lg italic'>- {testimonial.service}</p>
				</div>
			))}
		</div>
	);
};

export default Testimonials;
