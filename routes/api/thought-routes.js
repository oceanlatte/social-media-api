const router = require('express').Router();
const { getAllThoughts, addThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thoughts-controller');

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:userId')
  .post(addThought)
;

router
  .route('/:thoughtId')
  .get(getThoughtById)
;

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(deleteThought)
;

module.exports = router;