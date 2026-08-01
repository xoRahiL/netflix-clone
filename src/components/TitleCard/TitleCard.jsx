import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from 'react-router-dom'

const TitleCard = ({ title, category }) => {

  const [apiData, setApiData] = useState([])

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjExNWQyOGY4MTU3MGJjYmQ0ZTMzYmFmZTdhNjFmNiIsIm5iZiI6MTc1MzI4Mzk0Mi41NjA5OTk5LCJzdWIiOiI2ODgwZmQ2NjVhODU5YmU5ZDVmNzc4YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pTh-erxoSsrh_ald4KbWrz_BGDlBVYPZjgS6dEcJCn8'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));


    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {/* {cards_data.map((card, index) => { */}
        {apiData.map((card, index) => {
            return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
              <p>{card.original_title}</p>
            </Link>
            );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
