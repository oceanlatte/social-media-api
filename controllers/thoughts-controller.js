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
    Thought.findOne({ _id: params.thoughtId })
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
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
    .then(dbUpdatedThoughtData => {
      if(!dbUpdatedThoughtData) {
        res.status(404).json({ message: 'No thoughts with this id found!' });
        return;
      }
      res.json(dbUpdatedThoughtData);
    })
    .catch(err => res.json(err));
  },

  // DELETE thought by _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbDeletedData => {
      if(!dbDeletedData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbDeletedData);
    })
    .catch(err => res.json(err));
  },

  // ----- api/thoughts/:thoughtId/reactions -----
  // POST a reaction stored in a single thought's reactions array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with this id' });
        return;
      }
      res.json(dbThoughtData);
    }) 
    .catch(err => res.json(err));
  },  
  // DELETE to pull & remove a reaction by the reactionId value
}

module.exports = thoughtController;