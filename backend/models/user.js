const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'] },
  age: Number
});

const user = mongoose.model('User', userSchema);

module.exports = user;
