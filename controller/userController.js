const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Utils = require('../util/utils');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

exports.getSignup = (req, res, next) => {
  res.render('signup', {
    pageTitle: 'Sign up',
  });
};

exports.createUser = async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;

  if (!email || !password || !passwordConfirm || !name) {
    const err = Utils.createError(400, 'SIGNUP001');
    return res.status(400).json(err);
  }

  if (!Utils.validateEmail(email)) {
    const err = Utils.createError(412, 'SIGNUP004');
    return res.status(412).json(err);
  }

  if (!Utils.validatePassword(password)) {
    const err = Utils.createError(412, 'SIGNUP005');
    return res.status(412).json(err);
  }

  if (password !== passwordConfirm) {
    const err = Utils.createError(412, 'SIGNUP003');
    return res.status(412).json(err);
  }

  const user = await User.findOne({ where: { email: email } });

  if (user) {
    const err = Utils.createError(412, 'SIGNUP002');
    return res.status(412).json(err);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  return res.redirect('login');
};

exports.getLogin = (req, res, next) => {
  res.render('login', {
    pageTitle: 'login',
  });
};

exports.loginUser = async (req, res, next) => {
  const key = process.env.JWT_SECRET_KEY;
  const { email, password } = req.body;

  if (!email || !password) {
    const err = Utils.createError(400, 'LOGIN001');
    return res.status(400).json(err);
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    const err = Utils.createError(412, 'LOGIN002');
    return res.status(412).json(err);
  }

  const ret = await bcrypt.compare(password, user.password);
  if (!ret) {
    const err = Utils.createError(412, 'LOGIN002');
    return res.status(412).json(err);
  }

  let token = '';

  token = jwt.sign(
    {
      type: 'jwt',
      email: email,
      userId: user.id,
    },
    key,
    {
      expiresIn: '1h',
    }
  );

  res.cookie('token', token);
  console.log(token);

  return res.redirect('/');
};
