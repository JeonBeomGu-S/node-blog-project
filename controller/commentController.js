const { QueryTypes } = require('sequelize');
const Comment = require('../model/comment');
const Post = require('../model/post');
const User = require('../model/user');

const sequelize = require('../util/db');

const Utils = require('../util/utils');

exports.createComment = async (req, res, next) => {
  const { parentId, content } = req.body;

  if (!content) {
    const err = Utils.createError(400, 'COM001');
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

  const commentList = await sequelize.query(
    `with recursive commentTree (id, content, post_id, user_id, user_name, parent_id, create_date, update_date, level, path, cycle) as (
    select c.id, c.content, c.post_id, c.user_id, u.name, c.parent_id, c.create_date, c.update_date, 0, array[c.id], false
    from comment c
    join public.user u
    on c.user_id = u.id
    where c.parent_id is null and c.post_id = ${postId}

    union all

    select c.id, c.content, c.post_id, c.user_id, u.name, c.parent_id, c.create_date, c.update_date, level + 1, path || c.id, c.id = any(path)
    from comment c
    join public.user u
    on c.user_id = u.id
    join commentTree cte
    on c.parent_id = cte.id and c.post_id = ${postId} and not cycle
    )
    select id          as "id",
          content     as "content",
          post_id     as "postId",
          user_id     as "userId",
          parent_id   as "parentId",
          create_date as "createDate",
          user_name   as "userName"
    from commenttree
    order by path;`,
    { plain: false, type: QueryTypes.SELECT }
  );

  commentList.forEach((comment, index, array) => {
    array[index].createDate = Utils.getFormattedDateString(array[index].createDate);
  });

  return res.status(200).json({
    ...Utils.createSuccess(),
    commentList: commentList,
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
