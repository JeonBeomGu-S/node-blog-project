const Comment = require('../model/comment');
const Post = require('../model/post');
const User = require('../model/user');

const Utils = require('../util/utils');

exports.createComment = async (req, res, next) => {
  const { parentId, content } = req.body;

  if (!content) {
    const err = Utils.createError(400, 'COM0001');
    return res.status(400).json(err);
  }

  const userId = req.decoded.userId;
  const postId = parseInt(req.params.postId);

  try {
    await Comment.create({
      content: content,
      postId: postId,
      userId: userId,
      parentId: parentId,
    });
  } catch (e) {
    const err = Utils.createError(500, 'COM003');
    return res.status(500).json(err);
  }

  return res.status(200).json(Utils.createSuccess());
};

exports.getCommentList = async (req, res, next) => {
  const postId = parseInt(req.params.postId);

  if (!Utils.isPositiveNumber(postId)) {
    const err = Logic.createError(400, 'COM004');
    return res.status(400).json(err);
  }

  const comments = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
        required: true,
      },
    ],
    where: {
      postId: postId,
    },
    order: [['createDate', 'asc']],
  });

  const commentList = [];

  comments.forEach(comment => {
    commentList.push(comment.get({ plain: true }));
  });

  return res.status(200).json({
    ...Utils.createSuccess(),
    commentList: comments,
  });
};

exports.updateComment = async (req, res, next) => {
  const commentId = parseInt(req.params.commentId);
  const content = req.body.content;

  if (!Utils.isPositiveNumber(commentId)) {
    const err = Logic.createError(400, 'COM006');
    return res.status(400).json(err);
  }

  if (!content) {
    const err = Utils.createError(400, 'COM006');
    return res.status(400).json(err);
  }

  await Comment.update(
    {
      content: content,
    },
    {
      where: {
        id: commentId,
      },
    }
  );

  return res.status(200).json(Utils.createSuccess());
};

exports.deleteComment = async (req, res, next) => {
  const commentId = parseInt(req.params.commentId);

  if (!Utils.isPositiveNumber(commentId)) {
    const err = Logic.createError(400, 'COM010');
    return res.status(400).json(err);
  }

  try {
    await Comment.destroy({
      where: {
        id: commentId,
        userId: req.decoded.userId,
      },
    });
  } catch (e) {
    const err = Utils.createError(500, 'COM012');
    return res.status(500).json(err);
  }

  return res.status(200).json(Utils.createSuccess());
};
