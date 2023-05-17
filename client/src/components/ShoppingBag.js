import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../utils/cartProvider';

export default function ShoppingBag() {
  const { itemCount } = useContext(CartContext);
  return (
    <Link className='relative w-fit' to='/cart'>
      <FontAwesomeIcon className='h-8 w-8' icon={faShoppingBag} />
      {itemCount > 0 && (
        <div className='absolute bottom-0 right-0 h-5 bg-red-500 rounded-full flex items-center justify-center p-1'>
          <span className='text-white text-base'>{itemCount}</span>
        </div>
      )}
    </Link>
  );
}
