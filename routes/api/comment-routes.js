const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at']
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    Comment.create(req.body)
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'unable to locate comment' })
            return
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;