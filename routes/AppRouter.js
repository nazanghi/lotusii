const Router = require('express').Router()


const UserRouter = require('./UserRouter')
const MTGCardRouter = require('./MTGCardRouter')
const DeckRouter = require('./DeckRouter')

Router.use('/users', UserRouter)
Router.use('/cards', MTGCardRouter)
Router.use('/decks', DeckRouter)

//changed /mtgcards to /cards
module.exports = Router