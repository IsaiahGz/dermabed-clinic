import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_PRODUCT } from '../utils/queries';
import { useParams } from 'react-router-dom';

const ShopItem = ({ match }) => {
  const { itemId } = useParams();
  const { data, loading } = useQuery(QUERY_PRODUCT, {
    variables: { id: itemId },
  });
  if (loading) return <div>Loading...</div>;
  const { name, price, description, imageUrl, inStock } = data.product;

  return (
    <div className='container mx-auto px-4'>
      <div className='bg-white shadow rounded-lg p-6'>
        <img className='w-full h-64 object-cover mb-6' src={imageUrl} alt={name} />
        <h1 className='text-4xl font-semibold mb-2'>{name}</h1>
        <p className='text-xl mb-6'>{price}</p>
        <p className='text-lg mb-6'>{description}</p>
        <p className='text-lg mb-6'>{inStock ? 'In Stock' : 'Out of Stock'}</p>
        <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' disabled={!inStock}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
