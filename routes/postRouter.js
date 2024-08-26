const express = require('express');

const postController = require('../controller/postController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// index
router.get('/', postController.getIndex);

// posts
router.post('/api/posts', auth, postController.createPost);
router.get('/api/posts', postController.getPostList);
router.get('/api/posts/:postId', postController.getPost);
router.put('/api/posts/:postId', auth, postController.updatePost);
router.delete('/api/posts/:postId', auth, postController.deletePost);

module.exports = router;
