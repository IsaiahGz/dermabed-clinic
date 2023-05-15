import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Acne from './pages/Acne';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Header />
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/testimonials' element={<Testimonials />} />
							<Route path='/about' element={<About />} />
							<Route path='/services' element={<Acne />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/shop' element={<Shop />} />
							<Route path='/admin' element={<Admin />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
