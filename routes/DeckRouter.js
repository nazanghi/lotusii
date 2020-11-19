const Router = require('express').Router()
const DeckController = require('../controllers/DeckController')

Router.get('/', DeckController.GetAllDecks)
Router.get('/:deck_id', DeckController.GetDeck)
Router.post('/:user_id', DeckController.CreateDeck)
Router.put('/:deck_id', DeckController.RenameDeck)
Router.put('/:deck_id', DeckController.ChangeDescription)
Router.delete('/:deck_id', DeckController.DeleteDeck)

module.exports = Router

//ShuffleDeck will be a get function

//Review