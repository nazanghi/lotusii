//DONE
const express = require('express')

const {Deck, MTGCard, User} = require('../database/schema')

const GetAllDecks = async (request, response) => {
    try {
    const decks = await Deck.find()
    response.send({decks})
    } catch (error) {throw error}
}

const GetDeck = async (request, response) => {
    const deck = await Deck.findById(request.params.deck_id).populate('cards')
    response.send(deck)
    }


const CreateDeck = async(request, response) => {
    const body = request.body
    const deck = new Deck({
        name: body.name,
        description: body.description
    })
    await User.findByIdAndUpdate(
        request.params.user_id, 
            { $push: {
                decks: deck
            }
        }
        )
        deck.save()
        //user_id .decks.push(deck)
    response.send(deck)
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

const DeleteDeck = async (request, response) => {
    // await MTGCard.deleteMany({ _id: {$in: deck.mtgcard_ids}})
    await Deck.findByIdAndDelete(request.params.deck_id)
    response.send({message: `Deck Deleted`})
}

const AddCardToDeck = async (request, response) => {
    const newCard = await MTGCard.findById(request.params.mtgcard_id)
    const updatedDeck = await Deck.findByIdAndUpdate(
        { _id: request.params.deck_id},
        {
            $push: {
                MTGCardIds: newCard
            }
        }
    )
    response.send(updatedDeck)
}

const RemoveCardFromDeck = async (request, response) => {
    await MTGCard.deleteOne({id: request.params.mtgcard_id})
    const upDatedDeck = await Deck.findByIdAndUpdate(
        request.params.deck_id,
        {
            $pull:{
                MTGCardIds: {
                    _id: request.params.mtgcard_id
                }
            }
        },
        { upsert: true, new: true}
        )
        response.send(updatedDeck)      
}

module.exports ={
    GetAllDecks,
    GetDeck,
    CreateDeck,
    UpdateDeckInfo,
    DeleteDeck,
    AddCardToDeck,
    RemoveCardFromDeck
}