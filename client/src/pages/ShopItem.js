import { useQuery } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { QUERY_PRODUCT } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { CartContext } from '../utils/cartProvider';

const ShopItem = ({ match }) => {
  const { setItem } = useContext(CartContext);
  const { itemId } = useParams();
  const { data, loading } = useQuery(QUERY_PRODUCT, {
    variables: { id: itemId },
  });

  const [quantity, setQuantity] = useState(1);
  if (loading) return <div>Loading...</div>;
  const { name, price, description, imageUrl, inStock } = data.product;

  const handleAddToCart = () => {
    setItem(itemId, quantity);
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='bg-white shadow rounded-lg p-6'>
        <img className='w-full h-64 object-cover mb-6' src={imageUrl.default} alt={name} />
        <h1 className='text-4xl font-semibold mb-2'>{name}</h1>
        <p className='text-xl mb-6'>{price}</p>
        <p className='text-lg mb-6'>{description}</p>
        <p className='text-lg mb-6'>{inStock ? 'In Stock' : 'Out of Stock'}</p>

        <label htmlFor='quantity' className='mr-2'>
          Quantity
        </label>
        <input id='quantity' type='number' min='1' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

        <button
          className={`px-4 py-2 rounded text-white ${inStock ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'}`}
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
