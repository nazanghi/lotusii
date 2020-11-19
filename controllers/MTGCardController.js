//Review This

//THERE'S GOOD CODE YOU CAN CANNIBALIZE IN HERE FOR DECK CONTROLLER

const {Deck, MTGCard, } = require('../database/schema')

const GetCard = async (request, response) => {
    const card = await MTGCard.findById(request.params.card_id).select('id_name')
    response.send(card)
}

// const AddCardToDeck = async (request, response) => {
//     const newCard = await MTGCard.findById(request.params.card_id)
//     await Deck.findByIdAndUpdate(
//         { _id: request.params.deck_id },
//         {
//             $push: {
//                 cards: newCard
//             }
//         }
//     )
//     response.send({_id: request.params.deck_id})
// }

// const AddLooseCard = async (request, response) => {
//     const looseCard = await MTGCard.findById(request.params.card_id).select('id_name')
//     await Cart.update(
//         { _id: request.params.card_id },
//         {
//             $push: {
//                 items: looseCard
//             }
//         }
//     )
//     response.send({_id: request.params.cart_id})
// }

// const RemoveCard = async (request, response) => {
//     await MTGCard.deleteOne({id: request.params.card_id})
//     const updatedDeck = await Deck.findByIdAndUpdate(
//         request.params.deck_id,
//         { $pull: { cards: {_id: request.params.card_id } } },
//         { upsert: true, new: true}
//     )
//     response.send(updatedDeck)   
// }

const GetAllCards = async (request, response) => {
    try {
        const { page, limit } = request.query
        const offset = 
            page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const cards = await MTGCard.find()
        .limit(parseInt(limit))
        .skip(offset)
    response.send(cards)
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetCard,
    // AddCardToDeck,
    // RemoveCard,
    // AddLooseCard,
    GetAllCards
}