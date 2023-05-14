import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
		name: 'Services',
		path: '/services',
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

const Header = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

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

	return (
		<header className='w-full bg-slate-400 p-4'>
			<div className='inline-block'>
				<Link className='text-2xl' to='/'>
					<h1>Abeds Derm</h1>
				</Link>
			</div>
			{/* A navbar with links: Testimonials, About, Services, Contact and a login button */}
			<nav className='hidden md:block float-right'>
				<ul className='flex flex-row'>
					{links.map((link) => {
						return (
							<li className='mr-6' key={link.name}>
								<Link onClick={handleMobileNav} className='text-xl' to={link.path}>
									{link.name}
								</Link>
							</li>
						);
					})}
					<li className='mr-6'>
						<Link className='text-xl bg-sky-200 hover:bg-sky-300 p-2 rounded' to='/login'>
							Login
						</Link>
					</li>
				</ul>
			</nav>
			{/* A hamburger menu for mobile */}
			<div className='md:hidden float-right'>
				<button className='text-xl' onClick={handleMobileNav}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
			{/* A mobile nav menu that is hidden by default */}
			<nav id='mobileNavbar' className='bg-slate-300 md:hidden float-right fixed top-16 right-0 translate-x-80 transition w-48 h-screen'>
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
						<Link onClick={handleMobileNav} className='text-xl bg-sky-200 hover:bg-sky-300 p-2 rounded' to='/login'>
							Login
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
