const Blog = require("./Blog");
const Comment = require("./Comment");
const User = require("./User");
// User can have several posts
User.hasMany(Blog);

// Post belongs to the one user.
Blog.belongsTo(User, {
  onDelete: "CASCADE",
});

// User can have many comments with different blogs\posts
User.hasMany(Comment);
Comment.belongsTo(User, {
  onDelete: "CASCADE",
});

// Post can contains many comments from different users.
Blog.hasMany(Comment);
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

module.exports = { Blog, User, Comment };
