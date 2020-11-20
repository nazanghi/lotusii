//DONE
const {MTGCard} = require('../database/schema')

const GetCard = async (request, response) => {
    const card = await MTGCard.findById(request.params.card_id).select('id_name')
    response.send(card)
}
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
    GetAllCards
}