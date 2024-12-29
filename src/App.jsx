import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "./firebase"
import TVShows from './pages/TVShows/TVShows';
import Movies from './pages/Movies/Movies';
import NewAndPopular from './pages/NewAndPopular/NewAndPopular';
import MyList from './pages/MyList/MyList';
import BrowseLanguages from './pages/BrowseLanguages/BrowseLanguages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const navigate =useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth,async (user) => {
      if(user)
      {
        console.log('User is signed in:', user);
        navigate('/');
      }
      else 
      {
        console.log('User is signed out');  // User is signed out
        navigate('/login');  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out.  // Redirect to login page when user is logged out
      }
      
    })
  }, [])
  
  return (
    <div>
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/player/:id' element={<Player/>}></Route>
        <Route path="/tv-shows" element={<TVShows />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/new-and-popular" element={<NewAndPopular />}></Route>
        <Route path="/my-list" element={<MyList />}></Route>
        <Route path="/browse-languages" element={<BrowseLanguages />}></Route>
      </Routes>
      </div>
  )
}

export default App