const Blog = require("./Blog");
const Comment = require("./Comment");
const User = require("./User");

User.hasMany(Blog);
Blog.belongsTo(User, {
  onDelete: "CASCADE",
});
User.hasMany(Comment);
Comment.belongsTo(User, {
  onDelete: "CASCADE",
});
Blog.hasMany(Comment);
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// User.hasMany(Blog, {
//   foreignKey: 'user_id',
//   onDelete: "CASCADE",
// });

// Blog.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: "CASCADE",
// });

// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
// });
// User.belongsToMany(Blog, {
//   through: {
//     model: Comment,
//     unique: false
//   },
//   as: 'user_blog'
// });

// Blog.belongsToMany(User, {
//   through: {
//     model: Comment,
//     unique: false
//   },
//    as: 'blog_users'
// });

module.exports = { Blog, User, Comment };
