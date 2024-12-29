import React,{useEffect, useRef, useState} from 'react'
import "./TitleCards.css"

import { Link } from 'react-router-dom'
const TitleCard = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTlmNDM1NmY0YjQ4NWEzNDMyMmQxYmRlMWNkZmExMyIsIm5iZiI6MTczMzkyMTA1Ni44MDA5OTk5LCJzdWIiOiI2NzU5ODkyMGRhM2JkMzliODc4NjBjYTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tyr64PeiAEAGMWB_owG5nbTM_iHxwEz8lJH4i_ZRCxY'
    }
  };
const handleWheel=(event) => 
{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(() =>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[] )
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
})}
      </div>
    </div>
  )
}

export default TitleCard