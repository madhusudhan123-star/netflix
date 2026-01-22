import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../../config/apiUrl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage and if it's still valid
    const token = localStorage.getItem('token');
    if (token) {
      const expirationTime = localStorage.getItem('expirationTime');
      if (expirationTime && new Date().getTime() < expirationTime) {
        console.log('Token is still valid');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const token = response.data.token;
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

      const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      setLoading(false);
      setEmail('');
      setPassword('');
      if (response.status === 200) {
        toast.success(`${response.data.message} wait to close this one`, {
          onClose: () => navigate('/home')
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className='bg-black'>
        <div style={{ height: "100vh" }} className="text-white bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]">
          <div className="bg-custom-gradient">
            <div className="bg-black-40">
              <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
                <div>
                  <Link to="/">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix Logo"
                      width={120}
                      height={40}
                    />
                  </Link>
                </div>
                <div>
                  <button style={{ backgroundColor: "red" }} className="btn btn-primary px-3 py-1 rounded-md">
                    <Link to="/home/signup">Sign Up </Link>
                  </button>
                </div>
              </nav>
              <div className="flex items-center justify-center min-h-screen">
                <div style={{ backgroundColor: "#0000008f" }} className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix Logo"
                      className="w-32 h-auto"
                    />
                  </div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link to="https://help.netflix.com/en" className="font-medium text-gray-300 hover:text-white">
                          Need help?
                        </Link>
                      </div>
                      <div className="text-sm">
                        <Link to="/forgotPassword" className="font-medium text-gray-300 hover:text-white">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </button>
                    </div>
                  </form>
                  {errorMessage && (
                    <div className="mt-4 text-sm text-red-500">
                      {errorMessage}
                    </div>
                  )}
                  <div className="flex justify-between mt-6 text-sm text-gray-300">
                    <p>New to Netflix?</p>
                    <Link to="/home/signup" className="font-medium text-white hover:underline">
                      Sign up now
                    </Link>
                  </div>
                  <div className="mt-6 text-sm text-gray-300">
                    <p>
                      This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                      <Link to="#" className="text-blue-600 hover:underline">
                        Learn more.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <footer className="bg-black py-8 mt-20 text-white">
          <div className="container mx-auto px-4 text-white">
            <div className="flex flex-col md:flex-row text-white justify-between items-center mb-4">
              <div>
                <p className="text-gray-400">
                  Questions? Call <Link to="tel:000-000-000-000" className="text-gray-400 underline">6309792221</Link>
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="https://help.netflix.com/support/412" className="text-gray-400 underline mb-2">FAQ</a>
                <a href="https://www.netflix.com/cookiePreferences" className="text-gray-400 underline mb-2">Cookie Preferences</a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a href="https://www.netflix.com/gift-cards" className="text-gray-400 underline mb-2">Gift Card Terms</a>
                <a href="https://help.netflix.com/legal/termsofuse" className="text-gray-400 underline mb-2">Legal Notices</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
