const express = require('express');

const commentController = require('../controller/commentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/comments/:postId', auth, commentController.createComment);
router.get('/api/comments/:postId', commentController.getCommentList);
router.put('/api/comments/:commentId', auth, commentController.updateComment);
router.delete('/api/comments/:commentId', auth, commentController.deleteComment);

module.exports = router;
