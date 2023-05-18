import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PRODUCTS_LIST } from '../utils/queries';
import { MUTATE_CHECKOUT } from '../utils/mutations';
import { CartContext } from '../utils/cartProvider';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { loading, data } = useQuery(QUERY_PRODUCTS_LIST, {
    variables: { productIds: cartItems.map((item) => item.productId) },
  });
  const [checkout, checkoutStatus] = useMutation(MUTATE_CHECKOUT);
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

      <button
        className={
          checkoutStatus.loading
            ? 'px-4 py-2 bg-green-400 text-white rounded cursor-not-allowed'
            : 'px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        }
        disabled={checkoutStatus.loading}
        onClick={async () => {
          const stripeCheckout = await checkout({
            variables: {
              cartItems: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
            },
          });
          if (stripeCheckout.data?.checkout?.redirectUrl) window.location = stripeCheckout.data.checkout.redirectUrl;
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
