import React, {Component} from 'react'
import DisplayBoard from '../components/DisplayBoard'
import {
    __DeleteDeck,
    __GetSingleDeck,
    __RemoveCardFromDeck,
    __AddCardToDeck,
    __GetDecks
                } from '../services/DeckServices'
import {__GetProfile} from '../services/UserServices'

export default class DeckViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deckFetchError: false,
            decks: [],
            wantsCreateDeck: false,
            chosenDeck: null
        }
    }

    componentDidMount() {
        this.getDecks()
    }

    getDecks = async () => {
        try{
            const userDecks = await __GetDecks()
            this.setState(
                {
                    decks: userDecks.decks
                },
                ()=> this.setState(prevState=>({
                    decks: [...prevState.decks]
                }))
            )
        } catch(error){throw error}
    }

    addDeck = (deck) => {
        this.setState(prevState=>({
            decks: [...prevState.decks, deck]
        }))
    }

    deleteDeck = async (id) => {
        try {
            const keptDecks = this.state.decks.filter((deck) => deck._id !==id)
            this.setState({ decks: keptDecks})
            await __DeleteDeck(id)
        }catch(error){throw error}
    }
    //this function is kinda wack but works
    // like instead of saying "remove this," it says "keep everything except this"
    //  wack.
    render() {
        const { cards, decks }
        return(
            <div>
                <Nav
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                />
            </div>
        )
    }
}