const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  watchList: { type: Array, default: [] },
  seen: { type: Array, default: [] },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
