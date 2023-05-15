import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import User from './User';

const users = [
	{
		_id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'email@email1.com',
		isAdmin: false,
	},
	{
		_id: '2',
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'email2@email.com',
		isAdmin: true,
	},
];

export default function UserPanel() {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSetAdmin = (userId) => {
		// Logic to set isAdmin to true for the user with the given userId
		// ...
	};

	const filteredUsers = users.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className='bg-slate-200 rounded p-2'>
			<div className='flex items-center mb-4'>
				<input
					type='text'
					placeholder='Search...'
					className='mr-2 px-2 py-1 border border-gray-400 rounded-md'
					value={searchTerm}
					onChange={handleSearch}
				/>
				<FontAwesomeIcon icon={faSearch} className='text-gray-400' />
			</div>
			{filteredUsers.map((user) => (
				<User key={user._id} user={user} onSetAdmin={handleSetAdmin} />
			))}
		</div>
	);
}
