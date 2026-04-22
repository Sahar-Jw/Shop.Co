import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io"
import { IoPersonCircleOutline, IoMenu, IoClose } from "react-icons/io5"
import { RiShoppingCart2Line } from "react-icons/ri"
import { NavLink,Link } from "react-router-dom"
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductsContext";
import MainBtn from "../MainBtn/MainBtn";

export default function Nav({logo,icon}) {
const [showCategories,setShowCategories] = useState(false);
const [categories,setCategories] = useState([]);
const categoriesList = useRef(null);
const categoryTrigger = useRef(null);
const mobileCategoryTrigger = useRef(null);
const [searchQuery, setSearchQuery] = useState('');
const [showSearchResults, setShowSearchResults] = useState(false);
const searchList = useRef(null);
const searchTrigger = useRef(null);
const [isMobileOpen, setIsMobileOpen] = useState(false);
const mobileMenuRef = useRef(null);
const hamburgerRef = useRef(null);
const { isLoggedIn, username, logout: authLogout } = useAuth();
const navigate = useNavigate();
const { products, setFilters } = useProducts();
const { totalItems, cart, setCart } = useCart();
const [isDesktopWide, setIsDesktopWide] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsDesktopWide(window.innerWidth >= 992);
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.category.toLowerCase().includes(searchQuery.toLowerCase())
).slice(0, 6);

useEffect(() => {
    const categories = async () => {
        try {
            console.log('Fetching categories...');
            const res = await fetch('https://fakestoreapi.com/products/categories');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            console.log('Categories loaded:', data);
            setCategories(data);
        } catch (error) {
            console.error('Categories fetch failed:', error);
            setCategories(['electronics','jewelery','men\'s clothing','women\'s clothing']); // Fallback
        }
    }
    categories();
},[]);

const handleLogout = () => {
    authLogout();
    toast.success('Logged out successfully');
    navigate('/');
};


const closeMobileMenu = () => setIsMobileOpen(false);

useEffect(() => {
    const handleClickOutside = (e) => {
        // Ignore hamburger, mobile menu, category triggers
        if (hamburgerRef.current && hamburgerRef.current.contains(e.target)) return;
        if (mobileMenuRef.current && mobileMenuRef.current.contains(e.target)) return;
        if (categoryTrigger.current && categoryTrigger.current.contains(e.target)) return;
        if (mobileCategoryTrigger.current && mobileCategoryTrigger.current.contains(e.target)) return;
        
        console.log('Click outside - closing dropdowns/mobile');
        setShowCategories(false);
        setShowSearchResults(false);
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
            setIsMobileOpen(false);
        }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
}, []);

useEffect(() => { if (isMobileOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; } return () => { document.body.style.overflow = ''; }; }, [isMobileOpen]);

return (
    <>
    <nav className="px-10 lg:px-17.5 lg:gap-7.75 z-50 shadow-[0px_0px_20px_rgba(0,0,0,0.3)] bg-[#fffffff7] lg:py-6 py-2 flex items-center justify-between relative">
        <NavLink to={'/'}>
            <h1 className="lg:text-[32px] text-[20px] font-extrabold">
                {logo}
            </h1>
        </NavLink>
        
        <div className="hidden xl:flex flex-1 lg:justify-center gap-8 mx-4 lg:mx-8">
          <ul className="flex gap-5 items-center">
            <li className="text-[14px] font-light">
                <NavLink to={'/'}>
                    Home
                </NavLink>
            </li>
            <li className="text-[14px] font-light">
                <NavLink to={'/shop'}>
                    Shop
                </NavLink>
            </li>
            <li ref={categoryTrigger} className={`text-[14px] font-light cursor-pointer flex items-center relative gap-2`} onClick={(e) => { e.stopPropagation(); setShowCategories(prev => !prev); }}>
                    Categories <IoIosArrowDown />
                { showCategories && (
                    <div ref={categoriesList} className="absolute grid grid-cols-2 w-max -left-5 top-16 z-999 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.3)] rounded-md py-2">
                        {categories.map((cat) => {
                            return(
                                <div className=" w-max flex gap-2" key={cat}>
                                    <button onClick={() => {
            setFilters(prev => ({...prev, categories: [cat] }));
            navigate(`/shop/${cat}`);
            }} className='px-4 py-2 font-semibold rounded-full  border border-white hover:bg-black hover:text-white transition-all duration-300 bg-transparent cursor-pointer'>
                                        {cat}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </li>
            <li className="text-[14px] font-light">
                <NavLink to={'/about'}>
                    About Us
                </NavLink>
            </li>
          </ul>
        </div>
        <div className="relative hidden xl:block">
          <input 
            ref={searchTrigger}
            className="bg-gray w-100 p-2 px-4 text-[#7b7b7b] rounded-full pr-10" 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
          />
          {showSearchResults && searchQuery && filteredProducts.length > 0 && (
            <div ref={searchList} className="absolute left-0 top-full z-999 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.3)] rounded-xl py-2 w-80 max-h-96 overflow-y-auto border">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all"
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                >
                  <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
                <button ref={hamburgerRef} className="xl:hidden text-3xl cursor-pointer p-1" onClick={(e) => {
                        e.stopPropagation();
                        console.log('Hamburger clicked, setting isMobileOpen to true');
                        setIsMobileOpen(true);
                    }}>
                        <IoMenu />  
                </button>
                <NavLink to={'/cart'}  className="hidden xl:block">
                    <button className="cursor-pointer text-[24px] relative">
                        <RiShoppingCart2Line />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </NavLink>
{isLoggedIn ? (
                    <div className="relative hidden xl:block">
                        <button className=" text-[14px] font-semibold pr-4 flex items-center gap-2">
                            <IoPersonCircleOutline />
                            Hi, {username}
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="ml-2 px-4 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden xl:flex items-center gap-4">
                        <NavLink to={'/signin'}>
                            <button className="cursor-pointer font-semibold text-[16px]">
                                signin
                            </button>
                        </NavLink>
                        <NavLink to={'/signup'} className="text-sm font-semibold">
                            Sign Up
                        </NavLink>
                    </div>
                )}
        </div>
    </nav>
    {isMobileOpen && (
      <>
        <div className="fixed inset-0 bg-black/50 z-9999 md:hidden" onClick={closeMobileMenu} />
        <div ref={mobileMenuRef} className="fixed md:hidden top-0 right-0 h-full w-80 bg-[#fffffff7] shadow-[0px_0px_20px_rgba(0,0,0,0.3)] p-6 flex flex-col z-10000" style={{ transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }}>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[18px] font-bold">{logo}</h2>
            <button onClick={closeMobileMenu} className="text-[20px] cursor-pointer">
              <IoClose />
            </button>
          </div>
          <div className="relative mb-4">
            <input 
              className="w-full text-[14px] h-9 p-3 text-[#7b7b7b] rounded-full pr-10 border border-gray-300"
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchResults(true)}
            />
            {showSearchResults && searchQuery && filteredProducts.length > 0 && (
              <div className="absolute left-0 top-full z-10001 bg-white shadow-lg rounded-xl py-2 w-full max-h-96 overflow-y-auto border">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery('');
                      closeMobileMenu();
                    }}
                  >
                    <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.title}</p>
                      <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ul className="flex flex-col space-y-4 mb-4">
            <li><NavLink to="/" onClick={closeMobileMenu} className="text-[16px] font-light py-2 hover:font-medium transition-all block">Home</NavLink></li>
            <li><NavLink to="/shop" onClick={closeMobileMenu} className="text-[16px] font-light py-2 hover:font-medium transition-all block">Shop</NavLink></li>
            <li ref={mobileCategoryTrigger} className="text-[16px] font-light py-2 cursor-pointer hover:font-medium transition-all flex items-center gap-2" onClick={(e) => { e.stopPropagation(); setShowCategories(prev => !prev); console.log('Mobile categories toggle'); }}>
              Categories <IoIosArrowDown />
              {showCategories && categories.length > 0 && (
                <div className="absolute top-55.25 left-0 ml-4 mt-2 p-2 bg-white shadow-lg rounded-md w-[90%] z-10001">
                  {categories.map((cat) => (
                    <button key={cat} className="w-full text-left px-4 py-2 font-semibold hover:bg-gray-100 transition-all block" onClick={(e) => {
                      e.stopPropagation();
                      console.log('Category clicked:', cat);
                      setFilters(prev => ({...prev, categories: [cat] }));
                      navigate(`/shop/${cat}`);
                      closeMobileMenu();
                      setShowCategories(false)
                    }}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </li>
            <li><NavLink to="/about" onClick={closeMobileMenu} className="text-[16px] font-light py-2 hover:font-medium transition-all block">About Us</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMobileMenu} className="text-[16px] font-light py-2 hover:font-medium transition-all block">Contact Us</NavLink></li>
          </ul>
          <div className="flex flex-col gap-4">
            <NavLink to="/cart" onClick={closeMobileMenu} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
              <RiShoppingCart2Line className="text-2xl" />
              <span>Cart ({totalItems})</span>
            </NavLink>
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin" onClick={closeMobileMenu} >
                  <MainBtn btn={'Sign In'} style={'w-full text-[14px]'}/>
                </NavLink>
                <NavLink to="/signup" onClick={closeMobileMenu}>
                  <MainBtn btn={'Sign Up'} style={'w-full text-[14px]'}/>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </>
    )}
    </>
);
}
