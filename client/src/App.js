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
import Botox from './pages/Botox';
import Cancer from './pages/Cancer';
import Laser from './pages/Laser';
import ShopItem from './pages/ShopItem';
import Cart from './pages/Cart';
import Me from './pages/Me';

import CartProvider from './utils/cartProvider';

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
        <CartProvider>
          <div className='relative min-h-screen'>
            <Header />
            <div className='pb-36'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/testimonials' element={<Testimonials />} />
                <Route path='/about' element={<About />} />
                <Route path='/services/acne' element={<Acne />} />
                <Route path='/services/botox' element={<Botox />} />
                <Route path='/services/cancer' element={<Cancer />} />
                <Route path='/services/laser' element={<Laser />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/me' element={<Me />} />
                <Route path='/shop/:itemId' element={<ShopItem />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/admin' element={<Admin />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
