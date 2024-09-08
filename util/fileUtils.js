const path = require('path');
const multer = require('multer');
const uuid4 = require('uuid4');

exports.upload = dest => {
  return multer({
    // dest: 'files/',
    storage: multer.diskStorage({
      // set filename
      filename(req, file, done) {
        console.log(file);
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const filename = randomID + ext;
        done(null, filename);
      },
      // set destination folder
      destination(req, file, done) {
        console.log(file);
        done(null, path.join('public', dest));
      },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
  });
};

exports.getRootPath = () => {
  return path.dirname(require.main.filename);
};
