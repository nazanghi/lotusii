const { model } = require('mongoose')
const UserSchema = require('./models/User')
const DeckSchema = require('./models/Deck')
const CommentSchema = require('./models/Comment')

const User = model('users', UserSchema)
const Deck = model('decks', DeckSchema)
const Comment = model('comments', CommentSchema)


module.exports = { User, Deck, Comment }