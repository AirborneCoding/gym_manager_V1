const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser
} = require('../controllers/users.controller');

const { authenticateUser, authorizePermissions } = require("../middleware/authentication")

router.route('/').get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').put(authenticateUser, updateUserPassword);
router.delete("/deleteUser", authenticateUser, deleteUser);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
