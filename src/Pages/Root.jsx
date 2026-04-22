import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { ProductsProvider } from '../contexts/ProductsContext';
import { IoClose, IoSearch } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from 'react-i18next';

function RootLayout() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [showBanner, setShowBanner ] = useState(true);

  return (
    <>
      {!isLoggedIn && showBanner && 
        <div className='flex bg-black text-white p-2 justify-end lg:gap-116 md:gap-48 sm:gap-33 xs:gap-1 text-center'>
          <p className='sm:text-[14px] text-[12px]'>Sign up and get 20% off to your first order. 
            <Link to={'/signup'} className='ml-1.5 underline'>Sign Up Now</Link>
          </p>
          <button onClick={() => setShowBanner(false)} className='cursor-pointer'><IoClose /></button>
        </div>
      }
      <ProductsProvider>
        <CartProvider>
            <Nav logo={'SHOP.CO'} icon={<IoSearch className="text-[#5d5d5d] mr-2"/>} />
          <Outlet />
        </CartProvider>
      </ProductsProvider>
        <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
