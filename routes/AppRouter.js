const Router = require('express').Router()


const UserRouter = require('./UserRouter')
const DeckRouter = require('./DeckRouter')
const CommentRouter = require('./CommentRouter')

Router.use('/users', UserRouter)
Router.use('/decks', DeckRouter)
Router.use('/comments', CommentRouter)

module.exports = Router