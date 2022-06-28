const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async(req, res) => {
    try {
        const loggedIn = req.session.loggedIn
        const response = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = response.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn;
        const response = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]    
        });

        const post = response.get({ plain: true });
        res.render('edit-post', { post, loggedIn })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;