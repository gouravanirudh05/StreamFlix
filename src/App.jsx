import React,{Suspense,lazy,useEffect } from 'react';
import { Routes,Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./components/ErrorBoundary";
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Player = lazy(() => import("./pages/Player/Player"));
const TVShows = lazy(() => import("./pages/TVShows/TVShows"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const NewAndPopular = lazy(() => import("./pages/NewAndPopular/NewAndPopular"));
const MyList = lazy(() => import("./pages/MyList/MyList"));
const BrowseLanguages = lazy(() => import("./pages/BrowseLanguages/BrowseLanguages"));
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
      <ToastContainer theme="dark" />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/new-and-popular" element={<NewAndPopular />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/browse-languages" element={<BrowseLanguages />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
export default App