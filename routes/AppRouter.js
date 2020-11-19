const Router = require('express').Router()


const UserRouter = require('./UserRouter')
const MTGCardRouter = require('./MTGCardRouter')
const DeckRouter = require('./DeckRouter')

Router.use('/users', UserRouter)
Router.use('/mtgcards', MTGCardRouter)
Router.use('/decks', DeckRouter)


module.exports = Router