import React from 'react';
import TestimonialPanel from '../components/Admin/TestimonialPanel';
import UserPanel from '../components/Admin/UserPanel';

export default function Admin() {
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
