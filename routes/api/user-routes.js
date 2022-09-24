const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../../controllers/user-controller');

// routes for /api/users
router.route('/').get(getAllUsers).post(createUser);

// routes for /api/user/:ID
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
