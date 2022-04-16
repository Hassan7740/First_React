import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Home() {

  let [movies, setMovies] = useState([]);

  async function getMovies() {

    let { data } = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=d8c25bd2d4556d6beef2573d5b4710b4');
    console.log(data);
    setMovies(data.results);
    console.log(movies);

  }

  useEffect(() => {
    getMovies()


  }, [])

  return (
    <>
      <div className='row'>
        {movies.map((movie, index) => {
          return (
            <div className='col-md-2 mb-3' id={index}>
             
              <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title}`} />
              <p >{movie.title}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
