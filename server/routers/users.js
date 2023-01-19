const express = require('express');
const usersRouter = express.Router();
const UsersController = require('../controllers/usersController');

// create new user
usersRouter.post('/', UsersController.createUser);

// update users watchlist and watched list
usersRouter.patch('/', UsersController.updateUser);

// return all users and their data
// usersRouter.get('/');

module.exports = usersRouter;
