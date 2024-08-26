const User = require('./user');
const Post = require('./post');
const Category = require('./category');
const Comment = require('./comment');
const Like = require('./like');
const File = require('./file');

const defineAssociations = () => {
  // User
  User.hasMany(Post, { foreignKey: 'userId' });
  User.hasMany(Comment, { foreignKey: 'userId' });
  User.hasMany(Like, { foreignKey: 'userId' });

  // Post
  Post.belongsTo(Category, { foreignKey: 'categoryId' });
  Post.hasMany(Comment, { foreignKey: 'postId' });
  Post.hasMany(Like, { foreignKey: 'postId' });
  Post.hasMany(File, { foreignKey: 'postId' });
  Post.belongsTo(User, { foreignKey: 'userId' });

  // Categgory
  Category.hasMany(Post, { foreignKey: 'categoryId' });

  // Comment
  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.belongsTo(Post, { foreignKey: 'postId' });
  Comment.hasMany(Like, { foreignKey: 'commentId' });

  // Like

  Like.belongsTo(User, { foreignKey: 'userId' });
  Like.belongsTo(Post, { foreignKey: 'postId' });
  Like.belongsTo(Comment, { foreignKey: 'commentId' });

  // File
  File.belongsTo(Post, { foreignKey: 'postId' });
};

module.exports = defineAssociations;
