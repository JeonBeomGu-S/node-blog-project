const express = require('express');

const likeController = require('../controller/likeController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/api/likes', auth, likeController.getLikeList);
router.post('/api/likes', auth, likeController.createLike);

module.exports = router;
