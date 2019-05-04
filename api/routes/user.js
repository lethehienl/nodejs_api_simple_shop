const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/user');

router.post('/signup', UsersController.users_signup);

router.post('/login', UsersController.users_login);

router.delete('/:userId', checkAuth, UsersController.users_delete_user);

router.get('/', checkAuth, UsersController.users_get_all);

module.exports = router;
