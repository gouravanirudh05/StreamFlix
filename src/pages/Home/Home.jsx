import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]); // State for storing multiple banners
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null); // Track the selected banner for trailer/info
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current banner index

  useEffect(() => {
    // Fetching top-rated movies to display as banners
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBanners(data.results); // Set banners to movie results
        setSelectedBanner(data.results[0]); // Default to the first movie
      });
  }, []);

  useEffect(() => {
    // Automatically transition banners every 3 seconds
    const interval = setInterval(() => {
      if (banners.length > 0) {
        const nextIndex = (currentIndex + 1) % banners.length;
        setCurrentIndex(nextIndex);
        setSelectedBanner(banners[nextIndex]);
      }
    }, 3000); // 3 seconds delay

    return () => clearInterval(interval); // Cleanup on unmount
  }, [banners, currentIndex]);

  const handlePlayClick = () => {
    // Fetching the trailer URL for the selected banner
    if (selectedBanner) {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedBanner.id}/videos?language=en-US`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_API_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find((video) => video.type === 'Trailer');
          if (trailer) navigate(`/player/${selectedBanner.id}`);
        });
    }
  };

  return (
    <div className='home'>
      <NavBar />
      <div className='banner-container'>
        {selectedBanner && (
          <div className='banner'>
            <img
              src={`https://image.tmdb.org/t/p/original${selectedBanner.backdrop_path}`}
              alt=""
              className='banner-img'
            />
            <div className='banner-caption'>
              <img
                src={`https://image.tmdb.org/t/p/original${selectedBanner.poster_path}`}
                alt=""
                className='caption-img'
              />
              <p>{selectedBanner.overview}</p>
              <div className='banner-btns'>
                <button className='btn' onClick={handlePlayClick}>
                  Play
                </button>
                <button
                  className='btn dark-btn'
                  onClick={() => setShowInfo(!showInfo)}
                >
                  More Info
                </button>
              </div>
              {trailerUrl && (
                <div className='trailer'>
                  <iframe
                    src={trailerUrl}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {showInfo && (
                <div className='more-info'>
                  <h3>{selectedBanner.title}</h3>
                  <p>Release Date: {selectedBanner.release_date}</p>
                  <p>Rating: {selectedBanner.vote_average}</p>
                  <p>{selectedBanner.overview}</p>
                </div>
              )}
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
  );
};

export default Home;
