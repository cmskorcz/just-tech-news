const User = require('./User');
const Post = require('./Posts');
const Vote = require('./Votes');
const Comment = require('./Comment');

User.hasMany(Post, {
    onDelete: 'cascade'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
})

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    onDelete: 'cascade'
});

Post.hasMany(Vote, {
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    onDelete: 'cascade'
});

module.exports = { User, Post, Vote, Comment };