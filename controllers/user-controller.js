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
  // get single user 
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
  createUser({ body }, res) {
    User.create(body)
    .then(dbNewUserData => res.json(dbNewUserData))
    .catch(err => res.json(err));
  },

  // PUT update a user by their _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUpdatedUserData => {
      if(!dbUpdatedUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUpdatedUserData);
    })
    .catch(err => res.json(err));
  },

  // DELETE user by their _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    }) 
    .catch(err => res.status(400).json(err));
  },
  // ---- api/users/:userId/friends/:friendId ------
  // POST to add a new friend to a users' friend list
  addNewFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'Oops, No user found with this id!' });
        return;
      }
      res.json(dbUpdatedUserData);
    })
    .catch(err => res.json(err));
  },

  // DELETE to remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
}

module.exports = userController;