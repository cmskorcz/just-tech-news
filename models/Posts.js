const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create(body)
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            })
        })
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                 isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

// seeds
// Post.bulkCreate([
//     {
//         title: 'Good Evening',
//         post_url: 'google.com',
//         user_id: 1
//     },
//     {
//         title: 'Good Evening',
//         post_url: 'google.com',
//         user_id: 1
//     },
//     {
//         title: 'Good Evening',
//         post_url: 'google.com',
//         user_id: 1
//     },
//     {
//         title: 'Good Evening',
//         post_url: 'google.com',
//         user_id: 1
//     }
// ])

module.exports = Post