import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ShopMERN
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-grow mx-4">
            <form onSubmit={submitHandler} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="flex items-center hover:text-blue-300">
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
              <span>
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </span>
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center hover:text-blue-300">
                  <UserIcon className="h-6 w-6 mr-1" />
                  {userInfo.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-blue-300">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={submitHandler} className="flex mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            <div className="flex flex-col space-y-3">
              <Link
                to="/cart"
                className="flex items-center hover:text-blue-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCartIcon className="h-6 w-6 mr-1" />
                <span>
                  Cart
                  {cartItems.length > 0 && (
                    <span className="ml-1 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </span>
              </Link>

              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="hover:text-blue-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="hover:text-blue-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsMenuOpen(false);
                    }}
                    className="text-left hover:text-blue-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-blue-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
