import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjExNWQyOGY4MTU3MGJjYmQ0ZTMzYmFmZTdhNjFmNiIsIm5iZiI6MTc1MzI4Mzk0Mi41NjA5OTk5LCJzdWIiOiI2ODgwZmQ2NjVhODU5YmU5ZDVmNzc4YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pTh-erxoSsrh_ald4KbWrz_BGDlBVYPZjgS6dEcJCn8'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));

  }, [])

  return (
    <div className='player'>

      <img src={back_arrow_icon} alt="" onClick={() => { navigate(-1) }} />

      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" width='90%' height='90%' title='trailer' frameborder='0' allowFullScreen>
      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
