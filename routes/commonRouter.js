const express = require('express');

const commonController = require('../controller/commonController');

const router = express.Router();

router.get('/about', commonController.getAbout);

module.exports = router;
