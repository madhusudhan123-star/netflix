import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/Loading';
import API_URL from '../config/apiUrl';

const ResetPassword = () => {
  const token = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [addcss, setAddcss] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token.id}`, { newPassword });
      if (response.status == 200) {
        setLoading(false)
        setMessage("Your Password has been reset, Please close the tab")
        setAddcss('hidden');
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {loading && <LoadingSpinner />}
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-md">
        <h1 className="text-3xl mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={` ${addcss} w-full py-2 bg-red-600 hover:bg-red-700 rounded-md`}>
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
