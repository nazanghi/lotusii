//Review This one 

const express = require('express')
const {Deck, MTGCard, User} = require('../database/schema')

const GetAllDecks = async (request, response) => {
    try {
    const {page, limit } = request.query
    const offset = 
        page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit))
    .skip(offset)
    const displayDecks = await Deck.find()
    response.send({results: displayDecks.length, decks})
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
    deck.save()
    await User.findByIdAndUpdate(
        request.params.user_id, 
            { $push: {decks: deck}
        }
    )
    //user_id .decks.push(deck)
    response.send(deck)
}

const RenameDeck = async (request, response) => {
    await Deck.findByIdAndUpdate(
        request.params.deck_id,
        {
            ...request.body
        },
        {new: true, useFindAndModify: false},
        (error, (title)=> (error ? error : response.send(title))
        )
    )
}

const ChangeDescription = async (request, response) => {
    await Deck.findByIdAndUpdate(
        request.params.deck_id,
        {
            ...request.body
        },
        {new: true, useFindAndModify: false},
        (error, (description)=> (error ? error : response.send(description)))
    )
}

const DeleteDeck = async (request, response) => {
    await MTGCard.deleteMany({ _id: {$in: deck.cards}})
    await Deck.findByIdAndDelete(request.params.deck_id)
    response.send({message: `Deck Deleted`})
}

//need to make ShuffleDeck

module.exports ={
    GetDeck,
    CreateDeck,
    RenameDeck,
    ChangeDescription,
    DeleteDeck,
    GetAllDecks
}