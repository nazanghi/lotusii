const Router = require('express').Router()
const MTGCardController = require('../controllers/MTGCardController')

Router.get('/:card_id', MTGCardController.GetCard)
Router.get('/', MTGCardController.GetAllCards)
Router.put('/:deck_id/:card_id', MTGCardController.AddCardToDeck)
Router.delete('/:deck_id/:card_id', MTGCardController.RemoveCard)
Router.put('/cart/:card_id', MTGCardController.AddLooseCard)
module.exports = Router

//review these functions