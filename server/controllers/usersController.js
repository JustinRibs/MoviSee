const User = require('../models/userModel');

const UsersController = {};

UsersController.createUser = (req, res, next) => {
  const { name, watchList, seen } = req.body;
  User.create({ name: name, watchList: watchList, seen: seen }, (err, user) => {
    res
      .status(200)
      .send(
        'User created: ' +
          user.name +
          ' Watchlist: ' +
          user.watchList +
          ' seen: ' +
          user.seen
      );
    // return next();
  });
};

UsersController.updateUser = (req, res, next) => {
  const { name, watchList, seen } = req.body;
  //   User.findOneAndUpdate
};

module.exports = UsersController;
