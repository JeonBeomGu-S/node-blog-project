const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Utils = require('../util/utils');

exports.getSignup = (req, res, next) => {
  res.render('signup', {
    pageTitle: 'Sign up',
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const name = req.body.name;

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
  res.render('', {});
};

exports.postLogin = (req, res, next) => {
  res.render('', {});
};
