import React, { useState, useEffect } from 'react';
import axios from 'axios';
import movieServices from './services/movies';

function App() {
  // Figure out how to render state from this component
  // Start off with dummy data maybe
  // Once that is finished, need to figure out how to async get the data from my backend and update the state being rendered ... how do we update state in React? 🤔
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function fetchMovies() {
      const result = await axios.get('http://localhost:3001/movies');

      if (isMounted) {
        setMovies(result.data);
      }
    }
    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);
  // console.log(movies);
  return (
    <div>
      <ol>
        {movies.map((movie) => {
          return <li key={movie.id}>{movie.title}</li>;
        })}
      </ol>
    </div>
  );
}

export default App;
