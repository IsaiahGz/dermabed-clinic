import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

const Shop = () => {
  const { data } = useQuery(QUERY_PRODUCTS);
  const items = data?.products || [];

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>Shop</h1>

      <div className='flex flex-wrap -mx-2'>
        {items.map((item) => (
          <div key={item.id} className='w-full sm:w-1/2 lg:w-1/3 px-2 mb-4'>
            <div className='bg-white shadow rounded-lg overflow-hidden'>
              <img className='w-full h-64 object-cover' src={item.img} alt={item.name} />
              <div className='p-6'>
                <h2 className='text-2xl font-semibold mb-2'>{item.name}</h2>
                <p className='text-xl mb-2'>{item.price}</p>
                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
