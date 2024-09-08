const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

const uploadMiddleware = require('../middleware/uploadMiddleware');
const dotenv = require('dotenv');
dotenv.config();

// signup
router.post(
  '/api/signup',
  uploadMiddleware.userProfileMiddleware(process.env.USER_PROFILE_IMAGE_PATH),
  userController.createUser
);
router.get('/api/signup', userController.getSignup);

// login
router.post('/api/login', userController.loginUser);
router.get('/api/login', userController.getLogin);

// logout
router.post('/api/logout', userController.logoutUser);

module.exports = router;
