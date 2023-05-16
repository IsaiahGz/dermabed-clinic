import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Acne from './pages/Acne';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className='relative min-h-screen'>
					<Header />
					<div className= "pb-28">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/testimonials' element={<Testimonials />} />
							<Route path='/about' element={<About />} />
							<Route path='/services' element={<Acne />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/shop' element={<Shop />} />
							<Route path='/login' element={<LoginPage />} />
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
