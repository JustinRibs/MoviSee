const fetch = require('node-fetch');
const moviesController = {};

const apiKey = '149b05fa4bd7301aace305b1f65575dc';

moviesController.getMovies = (req, res, next) => {
  //   fetch movie list from api endpoint
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      res.locals.trending = data.results.slice(0, 11);
      return next();
    });
};

module.exports = moviesController;
