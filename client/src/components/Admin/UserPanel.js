import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { ADMIN_UPDATE_USER } from '../../utils/mutations';

import User from './User';

export default function UserPanel() {
  const [setAdminStatus] = useMutation(ADMIN_UPDATE_USER);
  const { data } = useQuery(QUERY_ALL_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSetAdmin = async (userId) => {
    try {
      const { data } = await setAdminStatus({
        variables: { userId, isAdmin: true },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const users = data?.users || [];
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
