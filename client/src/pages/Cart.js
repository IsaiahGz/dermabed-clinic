import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS_LIST } from '../utils/queries';
import { CartContext } from '../utils/cartProvider';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { loading, data } = useQuery(QUERY_PRODUCTS_LIST, {
    variables: { productIds: cartItems.map((item) => item.id) },
  });
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data?.productsList.map((item) => (
            <div key={item._id} className='flex items-center bg-white shadow rounded-lg p-6 mb-4'>
              <img className='w-24 h-24 object-cover mr-4' src={item.img} alt={item.name} />
              <div className='flex-grow'>
                <h2 className='text-2xl font-semibold mb-2'>{item.name}</h2>
                <p className='text-xl mb-2'>{item.price}</p>
              </div>
              <div className='flex-shrink-0'>
                <p className='text-lg mb-2'>Quantity: {cartItems.filter((cartItem) => cartItem.productId === item._id)[0].quantity}</p>
                <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'>Remove</button>
              </div>
            </div>
          ))}
        </>
      )}

      <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
