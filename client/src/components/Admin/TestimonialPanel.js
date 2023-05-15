import React, { useState } from 'react';
import Testimonial from './Testimonial';

const testimonials = [
	{
		_id: '1',
		user: {
			firstName: 'John',
			lastName: 'Doe',
		},
		dateCreated: Date.now(),
		testimonialText: 'This is a testimonial',
		isApproved: false,
	},
	{
		_id: '2',
		user: {
			firstName: 'Jane',
			lastName: 'Doe',
		},
		dateCreated: Date.now(),
		testimonialText: 'This is another testimonial',
		isApproved: false,
	},
	{
		_id: '3',
		user: {
			firstName: 'John',
			lastName: 'Smith',
		},
		dateCreated: Date.now(),
		testimonialText: 'This is a third testimonial (approved)',
		isApproved: true,
	},
];

export default function TestimonialPanel() {
	const [filterDisapproved, setFilterDisapproved] = useState(true);
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
