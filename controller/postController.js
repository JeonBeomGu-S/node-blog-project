const Post = require('../model/post');
const Category = require('../model/category');
const Utils = require('../util/utils');
const User = require('../model/user');

exports.getIndex = async (req, res, next) => {
  return res.render('index', {
    pageTitle: 'home',
  });
};

exports.createPost = async (req, res, next) => {
  const { title, content, categoryId } = req.body;

  if (!title) {
    const err = Utils.createError(412, 'POST003');
    return res.status(412).json(err);
  }

  if (!content) {
    const err = Utils.createError(412, 'POST004');
    return res.status(412).json(err);
  }

  try {
    await Post.create({
      title: title,
      content: content,
      categoryId: categoryId,
      userId: req.decoded.userId,
    });
  } catch (e) {
    console.log(e);
    const err = Utils.createError(500, 'POST005');
    return res.status(500).json(err);
  }
  return res.status(200).json(Utils.createSuccess());
};

exports.getPostList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const sortBy = req.query.sortBy || 'create_date';
  const sortOrder = req.query.sortOrder || 'desc';

  if (!Utils.isPositiveNumber(page) || !Utils.isPositiveNumber(pageSize)) {
    const err = Utils.createError(400, 'POST006');
    return res.status(400).json(err);
  }

  const postList = await Post.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order: [[sortBy, sortOrder]],
  });

  postList.forEach(post => {
    post = post.get({ plain: true });
  });

  return res.status(200).json({
    status: 200,
    errCode: '0',
    errMsg: 'Success',
    postList: postList,
  });
};

exports.getPost = async (req, res, next) => {
  const postId = parseInt(req.params.postId);

  if (!Utils.isPositiveNumber(postId)) {
    const err = Utils.createError(400, 'POST010');
    return res.status(400).json(err);
  }

  const post = await Post.findOne({
    include: [
      {
        model: Category,
        attributes: ['name'],
        required: true,
      },
      {
        model: User,
        attributes: ['name'],
        required: true,
      },
    ],
    where: {
      id: postId,
    },
  });

  await Post.update(
    {
      visitCount: post.visitCount + 1,
    },
    {
      where: {
        id: post.id,
      },
    }
  );

  return res.status(200).json({
    ...Utils.createSuccess(),
    ...post.get({ plain: true }),
  });
};

exports.updatePost = async (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const { title, content, categoryId } = req.body;

  if (!title) {
    const err = Utils.createError(412, 'POST003');
    return res.status(412).json(err);
  }

  if (!content) {
    const err = Utils.createError(412, 'POST004');
    return res.status(412).json(err);
  }

  await Post.update(
    {
      title: title,
      content: content,
      categoryId: categoryId,
    },
    {
      where: {
        id: postId,
        userId: req.decoded.userId,
      },
    }
  );

  return res.status(200).json(Utils.createSuccess());
};

exports.deletePost = async (req, res, next) => {
  const postId = parseInt(req.params.postId);

  if (!Utils.isPositiveNumber(postId)) {
    const err = Utils.createError(400, 'POST012');
    return res.status(400).json(err);
  }

  try {
    await Post.destroy({
      where: {
        id: postId,
        userId: req.decoded.userId,
      },
    });
  } catch (e) {
    const err = Utils.createError(500, 'POST011');
    return res.status(500).json(err);
  }

  return res.status(200).json(Utils.createSuccess());
};
