import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/auth/Home';
import Login from './pages/auth/Login';
import Signup  from './pages/auth/Signup';
import Signup_start from './pages/auth/Signup_start';
import User from './pages/User';
import Homes from './pages/Homes';
import Search from './pages/Search';
import Play_vid from './pages/Play_vid';
import Movies from './pages/Movies';
import Tvshows from './pages/Tvshows';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';





function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}  />
            <Route path='/sign_start' element={<Signup_start />}  />
            <Route path='/home/signup' element={<Signup />}  />
            <Route path='/login' element={<Login />}  />
            <Route path='/user' element={<User />}  />
            <Route path='/home' element={<Homes />} />
            <Route path='/search' element={<Search />} />
            <Route path='/Play' element={<Play_vid />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tv-shows' element={<Tvshows />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetpassword/:id' element={<ResetPassword />} />
            <Route path='*' element={<h1>Page Not Found</h1>} />
          </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
