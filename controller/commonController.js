const Utils = require('../util/utils');

exports.getAbout = (req, res, next) => {
  res.render('about', { pageTitle: 'about' });
};
