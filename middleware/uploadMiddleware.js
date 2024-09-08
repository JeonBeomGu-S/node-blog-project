const dotenv = require('dotenv');
const FileUtils = require('../util/fileUtils');

dotenv.config();

exports.userProfileMiddleware = dest => {
  const upload = FileUtils.upload(dest);
  return upload.single('profileImage');
};
