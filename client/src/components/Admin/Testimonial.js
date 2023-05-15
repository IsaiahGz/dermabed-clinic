import React, { useState } from 'react';

export default function Testimonial({ testimonial, onApprove, onDisapprove }) {
	const { user, isApproved, testimonialText } = testimonial;
	const [approved, setApproved] = useState(isApproved);

	const handleApprove = () => {
		setApproved(true);
		// onApprove(testimonial._id);
	};

	const handleDisapprove = () => {
		setApproved(false);
		// onDisapprove(testimonial._id);
	};

	return (
		<div className='p-4 border border-gray-400 '>
			<div className='flex justify-between'>
				<p className='text-lg font-bold mb-2'>
					{user.firstName} {user.lastName}
				</p>
				{approved ? (
					<button className='px-3 py-1 text-base font-medium text-white bg-red-500 rounded-md' onClick={handleDisapprove}>
						Disapprove
					</button>
				) : (
					<button className='px-3 py-1 text-base font-medium text-white bg-blue-500 rounded-md' onClick={handleApprove}>
						Approve
					</button>
				)}
			</div>
			<p className='text-gray-600'>{testimonialText}</p>
		</div>
	);
}
