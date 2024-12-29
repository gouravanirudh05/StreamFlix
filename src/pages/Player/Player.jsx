import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        // Check if results exist and are not empty
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        } else {
          console.error('No videos found for the given movie ID');
        }
      })
      .catch((err) => console.error(err));
  }, [id]); // Include `id` as a dependency

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : 'N/A'}</p>
        <p>{apiData.name || 'No name available'}</p>
        <p>{apiData.type || 'No type available'}</p>
      </div>
    </div>
  );
};

export default Player;
