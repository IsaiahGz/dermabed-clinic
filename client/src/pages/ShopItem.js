import React, { useEffect, useState } from 'react';

const ShopItem = ({ match }) => {
  const [item, setItem] = useState({});

  // Assuming you have an API endpoint to fetch individual item by id
  useEffect(() => {
    fetch(`http://example.com/api/items/${match.params.itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.log(error));
  }, [match.params.itemId]);

  return (
    <div className='container mx-auto px-4'>
      <div className='bg-white shadow rounded-lg p-6'>
        <img className='w-full h-64 object-cover mb-6' src={item.img} alt={item.name} />
        <h1 className='text-4xl font-semibold mb-2'>{item.name}</h1>
        <p className='text-xl mb-6'>{item.price}</p>
        <p className='text-lg mb-6'>{item.description}</p>
        <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShopItem;
