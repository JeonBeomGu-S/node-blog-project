const i18n = require('i18n');
const path = require('path');
const root = path.dirname(require.main.filename);

i18n.configure({
  locales: ['en'],
  directory: path.join(root, 'messages'),
  defaultLocale: 'en',
  objectNotation: true,
});

exports.createError = (status, errCode) => {
  const error = new Object();
  error.status = status;
  error.errCode = errCode;
  error.errMsg = i18n.__(errCode);

  return error;
};

exports.validateEmail = email => {
  return email.match(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
};

exports.validatePassword = password => {
  return password.match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/);
};
