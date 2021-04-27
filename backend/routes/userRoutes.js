const express = require("express");
const router = express.Router()
const { registerUser, loginUser, allUsers, getUserProfile, logout } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile)

router.route('/logout').get(logout);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)

module.exports = router;