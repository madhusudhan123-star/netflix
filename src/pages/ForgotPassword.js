import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'mongoose';
import LoadingSpinner from '../components/Loading';
import API_URL from '../config/apiUrl';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      if (response.status === 200) {
        setLoading(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {loading && <LoadingSpinner />}
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-md">
        <h1 className="text-3xl mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md">
            Send Reset Email
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
