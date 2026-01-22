import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/Loading';
import API_URL from '../../config/apiUrl';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('border-gray-300');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading stat

  useEffect(() => {
    if (confirmPassword) {
      let borderColor = 'border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500';
      for (let i = 0; i < confirmPassword.length; i++) {
        if (confirmPassword[i] !== password[i]) {
          borderColor = 'border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';
          break;
        }
      }
      setConfirmPasswordBorderColor(borderColor);
    } else {
      setConfirmPasswordBorderColor('border-gray-300');
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make a POST request to the backend endpoint
      // https://netflix-backend-code.onrender.com
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      // http://localhost:3000/home/signup
      // Handle successful registration
      setIsOpen(false); // Close the dialog on successful submission
      if (response.status === 200) {
        toast.success(response.data.message, {
          onClose: () => {
            navigate('/login'); // Use a function body to navigate
          }
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle registration error
      toast.error('Registration failed');
    }
    setLoading(false);
  };
  return (
    <div className='bg-black'>
      {loading && <LoadingSpinner />} {/* Show loading spinner if loading */}
      <div
        style={{ height: '100vh' }}
        className="text-white bg-black bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]"
      >
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
                <button className="btn btn-primary px-3 py-1 rounded-md" style={{ backgroundColor: 'red' }}>
                  <Link to="/login">Login</Link>
                </button>
              </div>
            </nav>
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-5xl font-black mb-4">
                Welcome to <span className="text-red-600">Netflix</span>
              </h1>
              <p className="text-lg mb-5">Watch anywhere. Cancel anytime.</p>
              <p>
                Ready to watch? Enter your email to create or restart your membership.
              </p>
              <div className="flex mt-3 gap-4">
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                  <Dialog.Trigger className="bg-red-600 text-white px-4 py-2 rounded">
                    Sign Up
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                    <Dialog.Content
                      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 max-w-md"
                      style={{ width: '460px' }}
                    >
                      <Dialog.Title className="text-2xl font-bold mb-4">
                        Sign Up
                      </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Add a password"
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-2 border rounded ${confirmPasswordBorderColor}`}
                            placeholder="Confirm password"
                            required
                          />
                        </div>
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mb-4">
                          Sign Up
                        </button>
                      </form>
                      <div className="mt-4">
                      </div>
                      <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                        <Cross2Icon />
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
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
              <div className="flex flex-wrap justify-center space-x-4">
              </div>
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
  );
};

export default SignUpForm;

