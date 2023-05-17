import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Testimonials',
    path: '/testimonials',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'Shop',
    path: '/shop',
  },
];

const Footer = () => {
  return (
    <footer className='flex flex-col w-full absolute bottom-0 justify-center mb-10'>
      <div className='mx-auto w-fit'>
        <nav className='flex justify-center flex-wrap gap-6 text-gray-500 font-medium'>
          {links.map((link, idx) => (
            <Link key={idx} className='hover:text-gray-900' to={link.path}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className='flex justify-center space-x-5'>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://img.icons8.com/fluent/30/000000/facebook-new.png' alt='Facebook' />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://img.icons8.com/fluent/30/000000/linkedin-2.png' alt='LinkedIn' />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://img.icons8.com/fluent/30/000000/instagram-new.png' alt='Instagram' />
          </a>
          <a href='https://messenger.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png' alt='Messenger' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <img src='https://img.icons8.com/fluent/30/000000/twitter.png' alt='Twitter' />
          </a>
        </div>

        <p className='text-center text-gray-700 font-medium'>&copy; 2022 Company Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
