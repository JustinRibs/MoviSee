import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesApp.css';

function App() {
  // Figure out how to render state from this component
  // Start off with dummy data maybe
  // Once that is finished, need to figure out how to async get the data from my backend and update the state being rendered ... how do we update state in React? 🤔
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    // check if component mounted
    let isMounted = true;
    // fetch movies from backend
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
  const [watchlist, setWatchlist] = useState([]);
  const [seen, setSeen] = useState([]);

  return (
    <div>
      <WantandWatched watchlist={watchlist} seen={seen} />
      <div className="movies-container">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="movie-container">
              <h4>{movie.title}</h4>
              <img
                style={{ width: '100px' }}
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />

              <div className="movie-buttons">
                <button
                  onClick={() => {
                    setWatchlist([...watchlist, movie.title]);
                  }}
                  style={{ marginRight: '5px' }}
                >
                  Want to watch
                </button>
                <button
                  onClick={() => {
                    setSeen([...seen, movie.title]);
                  }}
                >
                  Seen
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function User() {
//   const [user, setUser] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('user:' + user);
//     setUser(user);
//   };
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           id="user"
//           name="user"
//           value={user}
//           placeholder="Enter name here"
//           onChange={(event) => setUser(event.target.value)}
//         />

//         <br />

//         <br />
//         <button type="submit">Submit</button>
//         <br />

//         <h2>Current User: {user}</h2>
//       </form>
//     </div>
//   );
// }

function WantandWatched(props) {
  const [user, setUser] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('user:' + user);
    setUser(user);

    // post to database😮‍💨 CREATE USER BUTTON
    axios.post('http://localhost:3001/users', {
      name: user,
    });
  };
  const handleDBSubmit = () => {
    const url = 'http://localhost:3001/users';
    const newObj = {
      name: user,
      watchList: props.watchlist,
      seen: props.seen,
    };
    // patch to database
    axios.patch(url, newObj).then((data) => console.log(data));
  };

  return (
    <div>
      <h4>Enter name and press Create User to create User in database.</h4>
      <form>
        {' '}
        <input
          type="text"
          id="user"
          name="user"
          value={user}
          placeholder="Enter name here"
          onChange={(event) => setUser(event.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSubmit} type="submit" className="user-btn">
          Create User
        </button>
        <button className="db-btn" onClick={handleDBSubmit}>
          SUBMIT TO DATABASE
        </button>
        <br />
        <h2>Current User: {user}</h2>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <h4>
          WatchList:{' '}
          <ol>
            {props.watchlist.map((movie) => (
              <li>{movie}</li>
            ))}
          </ol>{' '}
        </h4>
        <p> </p>
        <h4>
          Seen:{' '}
          <ul>
            {props.seen.map((movie) => (
              <li>{movie}</li>
            ))}
          </ul>
        </h4>
      </div>
    </div>
  );
}

export default App;
