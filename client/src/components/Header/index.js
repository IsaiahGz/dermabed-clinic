import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';
import ShoppingBag from '../ShoppingBag';

const links = [
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

const serviceLinks = [
  {
    name: 'Acne',
    path: '/services/acne',
  },
  {
    name: 'Botox',
    path: '/services/botox',
  },
  {
    name: 'Cancer',
    path: '/services/cancer',
  },
  {
    name: 'Laser Hair Removal',
    path: '/services/laser',
  },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleMobileNav = () => {
    document.getElementById('mobileNavbar').classList.toggle('translate-x-80');
    // Add hidden after a delay to allow the transition to complete
    if (isNavOpen) {
      setTimeout(() => {
        setIsNavOpen(!isNavOpen);
      }, 150);
    } else {
      setIsNavOpen(!isNavOpen);
    }
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const closeServices = () => {
    setIsServicesOpen(false);
  };

  return (
    <header className='w-full bg-slate-400 p-2'>
      <div className='inline-block'>
        <Link className='text-2xl' to='/'>
          <h1>Abeds Derm</h1>
        </Link>
      </div>
      <nav className='hidden lg:block float-right'>
        <ul className='flex flex-row'>
          {links.map((link) => {
            return (
              <li className='mr-4 p-1' key={link.name}>
                <Link onClick={handleMobileNav} className='text-xl' to={link.path}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li className='mr-4 p-1 relative'>
            <button className='text-xl' onClick={toggleServices}>
              Services
              <FontAwesomeIcon className='ml-2' icon={faCaretDown} />
            </button>
            {isServicesOpen && (
              <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                <div className='py-1'>
                  {serviceLinks.map((link) => {
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </li>
          <ShoppingBag />
          {Auth.loggedIn() ? (
            <li className='ml-3'>
              <button className='text-xl p-1 rounded bg-red-300 hover:bg-red-400' onClick={Auth.logout}>
                {Auth.getProfile().data.firstName} Logout
              </button>
            </li>
          ) : (
            <li className='ml-3 p-1'>
              <Link className='text-xl bg-sky-200 hover:bg-sky-300 p-1 rounded' to='/login'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className='lg:hidden float-right'>
        <ShoppingBag />
        <button className='ml-3 text-xl' onClick={handleMobileNav}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <nav
        id='mobileNavbar'
        className='bg-slate-300 lg:hidden float-right fixed top-12 right-0 translate-x-80 transition w-48 h-screen z-10'
      >
        <ul className={isNavOpen ? 'block' : 'hidden'}>
          {links.map((link) => {
            return (
              <li className='p-3' key={link.name}>
                <Link onClick={handleMobileNav} className='text-xl' to={link.path}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li className='p-3'>
            <button onClick={toggleServices} className='text-xl'>
              Services
              <FontAwesomeIcon className='ml-2' icon={faCaretDown} />
            </button>
            {isServicesOpen && (
              <ul>
                {serviceLinks.map((link) => {
                  return (
                    <li key={link.name}>
                      <Link onClick={(handleMobileNav, closeServices)} className='text-xl' to={link.path}>
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          {Auth.loggedIn() ? (
            <li className='p-3'>
              <button className='text-xl p-1 rounded bg-red-300 hover:bg-red-400' onClick={Auth.logout}>
                {Auth.getProfile().data.firstName} Logout
              </button>
            </li>
          ) : (
            <li className='p-3'>
              <Link className='text-xl bg-sky-200 hover:bg-sky-300 p-1 rounded' to='/login'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
