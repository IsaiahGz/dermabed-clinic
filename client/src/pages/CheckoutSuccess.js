import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { QUERY_HISTORY_BY_SESSION } from '../utils/queries';
import { CartContext } from '../utils/cartProvider';

export default function CheckoutSuccess() {
  const { clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const { loading, data } = useQuery(QUERY_HISTORY_BY_SESSION, {
    variables: { checkoutSessionId: searchParams.get('session_id') },
    skip: !searchParams.has('session_id'),
    onCompleted: () => {
      clearCart();
    },
  });
  if (loading) return <div>Loading...</div>;
  if (!data.purchaseHistoryBySession) return <div>No data</div>;
  return (
    <div className='container mx-auto mt-10'>
      <div className=''>
        <Link to='/'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Back to Home</button>
        </Link>
      </div>
      <h2 className='text-3xl font-bold text-center'>Thank you for your purchase!</h2>
      <div className='mt-10'>
        <p className='text-lg'>
          Hello {data.purchaseHistoryBySession.name},{`\n`}Here are the details of your order! If you'd like to view your order history
          please login or create an account with the email you used to make your purchase: {data.purchaseHistoryBySession.email}.
        </p>
        <h3 className='mt-5 text-2xl font-bold'>Order Summary</h3>
        <div className='mt-5'>
          <p className='text-xl font-bold'>Order Number: {data.purchaseHistoryBySession._id}</p>
          <p className='text-xl font-bold'>
            Order Date: {new Date(parseInt(data.purchaseHistoryBySession._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
          </p>
          <p className='text-xl font-bold'>Order Total: ${data.purchaseHistoryBySession.amountTotal}</p>
        </div>
      </div>

      {/* Show items in products array */}
      <div className='mt-10'>
        <h3 className='text-2xl font-bold'>Items Ordered</h3>
        <div className='mt-5'>
          {data.purchaseHistoryBySession.productsQuantity.map((productQuantity) => (
            <div key={productQuantity.product._id} className='flex justify-between items-center mb-4 max-w-lg'>
              <div className='flex flex-col'>
                <p className='text-lg font-bold mb-1'>{productQuantity.product.name}</p>
                <p className='text-sm text-gray-500'>Quantity: {productQuantity.quantity}</p>
              </div>
              <div className='flex items-center'>
                <p className='text-lg font-bold'>${productQuantity.product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
