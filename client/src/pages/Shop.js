import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import { CartContext } from '../utils/cartProvider';

// Hard import images
import facialCleanser from '../assets/images/facialCleanser.png';
import retinolSerum from '../assets/images/retinalSerum.png';
import vitaminCSerum from '../assets/images/vitaminC.png';
import moisturizer from '../assets/images/hydratingFaceMoisturizer.png';
import faceScrub from '../assets/images/exfoliator.png';
import eyeCream from '../assets/images/eyeCream.png';
import faceMask from '../assets/images/brighteningMask.png';
import clayMask from '../assets/images/clayMask.png';
import sunscreen from '../assets/images/sunscreen.png';
import lipBalm from '../assets/images/lipBalm.png';

// Create map between imageUrl in product and hard import images
const imageMap = {
  '../assets/images/facialCleanser.png': facialCleanser,
  '../assets/images/retinolSerum.png': retinolSerum,
  '../assets/images/vitaminCSerum.png': vitaminCSerum,
  '../assets/images/faceMoisturizer.png': moisturizer,
  '../assets/images/faceScrub.png': faceScrub,
  '../assets/images/eyeCream.png': eyeCream,
  '../assets/images/faceMask.png': faceMask,
  '../assets/images/clayMask.png': clayMask,
  '../assets/images/sunscreen.png': sunscreen,
  '../assets/images/lipBalm.png': lipBalm,
};

const Shop = () => {
  const { addOne } = useContext(CartContext);
  const { data, loading } = useQuery(QUERY_PRODUCTS);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      const updatedItems = data.products.map((item) => ({
        ...item,
        imageUrl: imageMap[item.imageUrl],
      }));

      setItems(updatedItems);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>Shop</h1>

      <div className='flex flex-wrap -mx-2'>
        {items.map((item) => (
          <div key={item._id} className='w-full sm:w-1/2 lg:w-1/3 px-2 mb-4'>
            <div className='bg-white shadow rounded-lg overflow-hidden'>
              <Link to={`/shop/${item._id}`}>
                {item.imageUrl && <img className='w-full h-64 object-cover' src={item.imageUrl} alt={item.name} />}
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
