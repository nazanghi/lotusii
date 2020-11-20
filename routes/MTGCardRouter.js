const Router = require('express').Router()
const MTGCardController = require('../controllers/MTGCardController')

Router.get('/:card_id', MTGCardController.GetCard)
Router.get('/', MTGCardController.GetAllCards)
module.exports = Router

//review these functions