import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { Helmet } from "react-helmet-async";
const Home = () => {
  const [banners, setBanners] = useState([]);
  const [trailerUrls, setTrailerUrls] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setBanners(data.results);
        const trailers = await Promise.all(
          data.results.map((movie) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
              {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: import.meta.env.VITE_API_KEY,
                },
              }
            )
              .then((res) => res.json())
              .then((videoData) => {
                const trailer = videoData.results.find((vid) => vid.type === 'Trailer');
                return trailer
                  ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&loop=1&playlist=${trailer.key}`
                  : null; 
              })
          )
        );
        setTrailerUrls(trailers);
      });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (banners.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }
    }, 30000); 
    return () => clearInterval(interval); 
  }, [banners]);
  const handleAudioPlayback = () => {
    const iframe = document.querySelector('.banner-trailer');
    if (iframe) {
      const src = iframe.src;
      iframe.src = src; 
    }
  };
  return (
    <Helmet>
      <title>StreamFlix - Home</title>
      <meta name="description" content="Discover the latest movies, TV shows, and more on Netflix." />
    
    <div className='home' onClick={handleAudioPlayback}>
      <NavBar />
      <div className='banner-container'>
        {banners.length > 0 && trailerUrls.length > 0 && (
          <div className='banner'>
            <iframe
              src={trailerUrls[currentIndex]} 
              title='Trailer Preview'
              className='banner-trailer'
              allow='autoplay; encrypted-media'
              allowFullScreen
            ></iframe>
            <div className='banner-caption'>
              <h2>{banners[currentIndex].title}</h2>
              <p>{banners[currentIndex].overview}</p>
            </div>
          </div>
        )}
      </div>
      <div className='more-cards'>
        <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
        <TitleCards title={'Only on Netflix'} category={'popular'} />
        <TitleCards title={'Upcoming'} category={'upcoming'} />
        <TitleCards title={'Top Picks for You'} category={'now_playing'} />
      </div>
      <Footer />
    </div>
    </Helmet>
  );
};
export default Home;
