const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

// signup
router.post('/api/signup', userController.postSignup);
router.get('/api/signup', userController.getSignup);

// login
router.post('/api/login', userController.postLogin);
router.get('/api/login', userController.getLogin);

module.exports = router;