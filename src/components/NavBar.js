import React, { useState, useRef } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/apiUrl';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_URL}/logout`);
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('Authorization');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200); // 2 seconds delay
  };


  return (
    <nav className={`bg-black bg-opacity-50 fixed top-0 left-0 right-0 z-50 ${isScrolled && 'bg-black'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <a href="/home" className="text-red-600 font-bold text-4xl">
            NETFLIX
          </a>
          <ul className="hidden md:flex md:ml-8 md:items-center">
            <li>
              <a href="/home" className="text-white hover:text-gray-400 px-4 py-2">
                Home
              </a>
            </li>
            <li>
              <a href="/tv-shows" className="text-white hover:text-gray-400 px-4 py-2">
                TV Shows
              </a>
            </li>
            <li>
              <a href="/movies" className="text-white hover:text-gray-400 px-4 py-2">
                Movies
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          {/* <Link to='/search'> <FaSearch className="text-white mr-4 cursor-pointer" /></Link> */}
          <div className="relative group">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaUser className="text-white mr-2 cursor-pointer" />
              <div className={`absolute top-full right-2 mt-2 bg-black rounded-md shadow-lg ${isVisible ? 'block' : 'hidden'}`}>
                <ul className="py-2">
                  <li>
                    <a href="/user" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Account
                    </a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;