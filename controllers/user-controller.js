const User = require('../models/User');

// api/users
const userController = {
  // get ALL users
  getAllUsers(req, res) {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  // get single user by _id, thought, and friend data
  getUserById({ params }, res)  {
    User.findOne({ _id: params.id })
    .then(dbOneUserData => {
      if(!dbOneUserData) {
        res.status(404).json({ message: 'No user with this id found!' })
        return;
      }
      res.json(dbOneUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  // POST new user

  // PUT update a user by their _id

  // DELETE user by their _id

  // BONUS: Remove a user's associated thoughts when deleted

}

module.exports = userController;