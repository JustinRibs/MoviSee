// route handler for all client request coming into /movies endpoint
const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController');

moviesRouter.get('/', moviesController.getMovies, (req, res) => {
  res.status(200).json(res.locals.trending);
});

module.exports = moviesRouter;
