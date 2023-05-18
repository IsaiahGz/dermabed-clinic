import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import { CartContext } from '../utils/cartProvider';

const Shop = () => {
  const { addOne } = useContext(CartContext);
  const { data } = useQuery(QUERY_PRODUCTS);
  const items = data?.products || [];

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>Shop</h1>

      <div className='flex flex-wrap -mx-2'>
        {items.map((item) => (
          <div key={item._id} className='w-full sm:w-1/2 lg:w-1/3 px-2 mb-4'>
            <div className='bg-white shadow rounded-lg overflow-hidden'>
              <Link to={`/shop/${item._id}`}>
                <img className='w-full h-64 object-cover' src={item.img} alt={item.name} />
                <div className='p-6'>
                  <h2 className='text-2xl font-semibold mb-2'>{item.name}</h2>
                </div>
              </Link>
              <p className='text-xl mb-2'>{item.price}</p>
              <button
                className={`px-4 py-2 rounded text-white ${item.inStock ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'}`}
                onClick={() => addOne(item._id)}
                disabled={!item.inStock}
              >
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
