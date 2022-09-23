const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Please provider a username',
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: 'Please enter a valid email address.',
    unique: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  }
});

const User = model('User', UserSchema);

module.exports = User;
