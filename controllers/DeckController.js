const express = require('express')
const {Deck, MTGCard, User} = require('../database/schema')



const CreateDeck = async (request, response) => {
    try{
        const body = request.body
        const deck = new Deck({
        title: body.title,
        description: body.description,
        user_id: request.params.user_id
        })
        deck.save()
        //not sure if I need the below function
        // await User.findByIdAndUpdate(
        //     request.params.user_id,
        //     { $push: {
        //         decks: deck
        //     }}
        // )
        console.log('DeckController, CreateDeck hits')
        response.send(deck)
    } catch (error) {
        console.log('DeckController, CreateDeck hits')
        throw error
    }
}

const GetDeck = async (request, response) => {
    try {
        const deck = await Deck.findById(request.params.deck_id)
        //possibly add a populate for the cards 
        console.log('DeckController: GetDeck hits')
        response.send(deck)
    } catch (error) {
        console.log('DeckController: GetDeck fails')
        throw error
    }
}

const GetAllDecks = async (request, response) => {
    try {
        const { page, limit } = request.query
        const offset = 
            page ==='1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        .limit(parseInt(limit))
        .skip(offset)
        const decks = await Deck.find()
        console.log("DeckController, GetAllDecks hits")
        response.send({decks})
    } catch (error) {
        console.log("DeckController, GetAllDecks fails")
        throw error
    }
}


const UpdateDeckInfo = async (request, response) => {
    try { 
        const deckToUpdate = await Deck.findById(request.params.deck_id)
        await Deck.findByIdAndUpdate(
            request.params.deck_id,
            {
                ...request.body
            },
            {new: true, useFindAndModify: false},
            console.log('DeckInfo', request.params.deck_id),
            console.log('Deck Body', request.body),
        response.send(deckToUpdate)
    ) 
} catch(error){throw error}
}

const UpdateDeckInfo = async ( request, response) => {
    try { 
        await Deck.findByIdAndUpdate(
        request.params.deck_id,
        {
            ...request.body
        },
        { new: true, useFindAndModify: false },
        (error, (description) => (error ? (
            error, console.log('DeckController, updateDeckInfo error')
            ) : (
                console.log('DeckController, UpdateDeckInfo hits'), 
                response.send(description))
            ))
        )
    } catch (error) {
        console.log('DeckController, UpdateDeckInfo fails')
        throw error
    }
}

const DeleteDeck = async (request, response) => {
    const deck = findById(request.params.deck_id)
    await Comment.deleteMany({ _id: { $in: deck.comments }})
    await Deck.deleteOne(request.params.deck_id)
}
//TODO Update AddCard and RemoveCard's functionality 
// const AddCardToDeck = async (request, response) => {
//     const newCard = await MTGCard.findById(request.params.mtgcard_id)
//     const updatedDeck = await Deck.findByIdAndUpdate(
//         { _id: request.params.deck_id},
//         {
//             $push: {
//                 MTGCardIds: newCard
//             }
//         }
//     )
//     response.send(updatedDeck)
// }

// const RemoveCardFromDeck = async (request, response) => {
//     await MTGCard.deleteOne({id: request.params.mtgcard_id})
//     const upDatedDeck = await Deck.findByIdAndUpdate(
//         request.params.deck_id,
//         {
//             $pull:{
//                 MTGCardIds: {
//                     _id: request.params.mtgcard_id
//                 }
//             }
//         },
//         { upsert: true, new: true}
//         )
//         response.send(updatedDeck)      
// }

module.exports ={
    GetAllDecks,
    GetDeck,
    CreateDeck,
    UpdateDeckInfo,
    DeleteDeck,
    // AddCardToDeck,
    // RemoveCardFromDeck
}