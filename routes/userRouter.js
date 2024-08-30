const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

// signup
router.post('/api/signup', userController.createUser);
router.get('/api/signup', userController.getSignup);

// login
router.post('/api/login', userController.loginUser);
router.get('/api/login', userController.getLogin);

// logout
router.post('/api/logout', userController.logoutUser);

module.exports = router;
