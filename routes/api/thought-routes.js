const { getAllThoughts, addThought, getThoughtById } = require('../../controllers/thoughts-controller');

const router = require('express').Router();

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:userId')
  .post(addThought)
;

router
  .route('/:id')
  .get(getThoughtById)
;

module.exports = router;