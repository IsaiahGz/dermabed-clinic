import React from 'react';

const Contact = () => {
  return (
    <div className='container mx-auto mt-2 min-h-screen flex flex-col justify-center items-center px-4 w-full '>
      <h1 className='text-4xl font-semibold mb-36 text-blue-500'>Contact Us</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-blue-600'>
        <div>
          <h2 className='text-2xl font-semibold mb-2 flex '>Contact Us:</h2>
          <p className='text-lg mb-2'>
            <strong>Address:</strong> 1234 AwesomeSkin St, GlowingSkin, NC 56789
          </p>
          <p className='text-lg mb-2'>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className='text-lg mb-2'>
            <strong>Email:</strong> bestDocs@DermAbed.com
          </p>
          <p className='text-lg mb-2'>
            <strong>Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM
          </p>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-2  mt-10 md:mt-0'>Location:</h2>
          {/* Here you might want to embed a map showing the location of your office. */}
          <div className='h-64 bg-gray-200'>
          <iframe
              title='Map'
              className='w-full h-full'
              src='https://maps.google.com/maps?q=800+S+Mint+St%2C+Charlotte%2C+NC+28202&z=15&output=embed'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
