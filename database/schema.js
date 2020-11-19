const { model } = require('mongoose')
const UserModel = require('./models/User')
const DeckModel = require('./models/Deck')
const MTGCardModel = require('./models/MTGCard')

const User = model('User', UserModel)
const Deck = model('Deck', DeckModel)
const MTGCard = model('MTGCard', MTGCardModel)

module.exports = { User,Deck, MTGCard}