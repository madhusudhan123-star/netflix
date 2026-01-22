import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import NavBar from '../components/NavBar';
import LoadingSpinner from '../components/Loading';
import API_URL from '../config/apiUrl';



const ProfileDetails = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: 'https://via.placeholder.com/150',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const response = await axios.get(`${API_URL}/userdetail`, config);
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching user details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const response = await axios.put(`${API_URL}/userdetail`, {
        name,
        email,
        password,
      }, config);
      console.log(response.data);
      setIsOpen(false);
      fetchUserDetails();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error updating user details:', error);
      setErrorMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div>
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <NavBar />
        {loading && <LoadingSpinner />}
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-8 mt-20">
            <h2 className="text-3xl font-bold">{user.name}</h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Account Details</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user.email}</span>
              </div>

              <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Trigger className="bg-red-600 text-white px-4 py-2 rounded font-bold">
                  Update Profile
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/60" />
                  <Dialog.Content
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-lg shadow-lg p-8 max-w-md"
                    style={{ width: '460px' }}
                  >
                    <Dialog.Title className="text-3xl font-bold mb-6">
                      Update Profile
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 rounded text-white"
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
                          className="w-full px-4 py-2 bg-gray-700 rounded text-white"
                          placeholder="Email"
                          required
                        />
                      </div>
                      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-3 rounded font-bold w-full mb-4"
                      >
                        Save Changes
                      </button>
                    </form>
                    <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-white">
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
  );
};

export default ProfileDetails;