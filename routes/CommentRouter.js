const Router = require('express').Router()
const CommentController = require('../controllers/CommentController')

Router.post('/:deckId/:userId', CommentController.CreateComment)
Router.put('/:commentId', CommentController.EditComment)
Router.delete('/:deckId/remove/:commentId', CommentController.DeleteComment)

module.exports = Router