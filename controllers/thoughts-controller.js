const { Thought, User } = require('../models');

const thoughtController = {
  // GET ALL thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  
  //GET one thought by _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbOneThoughtData => {
      if (!dbOneThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' })
        return;
      }
      res.json(dbOneThoughtData);
    }) 
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  // POST new thought - push created thought's _id 
  // to associated user's thoughts array
  addThought({ params, body }, res) {
    console.log("body in new thought", body)
    console.log('params in new thought:', params)
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id! '})
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }, 

  // PUT updated thought by _id

  // DELETE thought by _id


  // ----- api/thoughts/:thoughtId/reactions -----

  // POST a reaction stored in a single thought's reactions array field
  
  // DELETE to pull & remove a reaction by the reactionId value
}

module.exports = thoughtController;