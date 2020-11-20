const Router = require('express').Router()
const DeckController = require('../controllers/DeckController')

Router.get('/', DeckController.GetAllDecks)
Router.get('/:deck_id', DeckController.GetDeck)
Router.post('/:user_id', DeckController.CreateDeck)
Router.put('/:deck_id', DeckController.UpdateDeckInfo)
Router.delete('/:deck_id', DeckController.DeleteDeck)
Router.put('/:deck_id/:card_id', DeckController.AddCardToDeck)
Router.delete('/:deck_id/:card_id', DeckController.RemoveCardFromDeck)

module.exports = Router

//need to add routes for StoreCardInDeck
                    //   RemoveCardFromDeck