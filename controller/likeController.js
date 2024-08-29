const Utils = require('../util/utils');
const Like = require('../model/like');
const Post = require('../model/post');
const Category = require('../model/category');
const Comment = require('../model/comment');

exports.getLikeList = async (req, res, next) => {
  const userId = req.decoded.userId;

  // liked posts
  const likedPostList = await Like.findAll({
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'createDate', 'visitCount'],
        required: true,
        include: [
          {
            model: Category,
            attributes: ['name'],
            required: true,
          },
        ],
      },
    ],
    where: {
      userId: userId,
    },
  });

  // liked comments
  const likedCommentList = await Like.findAll({
    include: [
      {
        model: Comment,
        attributes: ['id', 'postId', 'content', 'createDate'],
        required: true,
        include: [
          {
            model: Post,
            attributes: ['title', 'createDate'],
            required: true,
          },
        ],
      },
    ],
    where: {
      userId: userId,
    },
  });

  likedPostList.forEach((post, index, array) => {
    array[index] = post.get({ plain: true });
    array[index].createDate = Utils.getFormattedDateString(array[index].createDate);
    array[index].post.createDate = Utils.getFormattedDateString(array[index].post.createDate);
  });

  likedCommentList.forEach((comment, index, array) => {
    array[index] = comment.get({ plain: true });
    array[index].createDate = Utils.getFormattedDateString(array[index].createDate);
    array[index].comment.createDate = Utils.getFormattedDateString(array[index].comment.createDate);
    array[index].comment.post.createDate = Utils.getFormattedDateString(
      array[index].comment.post.createDate
    );
  });

  return res.status(200).json({
    ...Utils.createSuccess(),
    likedPostList: likedPostList,
    likedCommentList: likedCommentList,
  });
};

exports.createLike = async (req, res, next) => {
  const id = parseInt(req.query.id);
  const type = req.query.type;
  const userId = req.decoded.userId;

  if (!Utils.isPositiveNumber(id) || (type !== 'post' && type !== 'comment')) {
    const err = Utils.createError(400, 'LIKE003');
    return res.status(400).json(err);
  }

  if (type === 'post') {
    try {
      const likedPost = await Like.findOne({
        where: {
          postId: id,
        },
      });
      if (!likedPost) {
        const err = Utils.createError(404, 'LIKE004');
        return res.status(404).json(err);
      }
      await Like.create({
        postId: id,
        userId: userId,
      });
    } catch (e) {
      const err = Utils.createError(500, 'LIKE005');
      return res.status(500).json(err);
    }
  } else if (type === 'comment') {
    try {
      const likedComment = await Like.findOne({
        where: {
          commentId: id,
        },
      });
      if (!likedComment) {
        const err = Utils.createError(404, 'LIKE004');
        return res.status(404).json(err);
      }
      await Like.create({
        commentId: id,
        userId: userId,
      });
    } catch (e) {
      const err = Utils.createError(500, 'LIKE005');
      return res.status(500).json(err);
    }
  }

  return res.status(200).json(Utils.createSuccess());
};
