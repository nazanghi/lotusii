import React, { Component } from 'react'
import DisplayBoard from '../components/DisplayBoard'
import { __GetCards} from '../services/CardServices'
//import a style sheet when it's done 
import {
     __AddCardToDeck, 
     __GetDecks, 
     __GetSingleDeck 
    } from '../services/DeckServices'


export default class BrowseCards extends Component {
    constructor () {
        super()
        this.state = {
        cards: [],
        chosenDeck: null, 
        currentPage: 1,
        decks:[]
    }
}

    componentDidMount() {
        this.getAllCards()
        
    }

    getDecks = async () => {
        try{
            const decks = await __GetDecks(this.state.decks)
            this.setState({decks: [...this.state.decks, ...decks]})
        } catch(error){throw error}
    }

    getAllCards = async () => {
        try {
            const cards = await __GetCards(this.state.currentPage)
            this.setState({cards: [...this.state.cards, ...cards]})
        } catch (error) {throw error}
    }
    

    incrementPage = () =>
        this.setState(
            (prevState) => ({ currentPage: prevState.currentPage ++ }),
            () => this.getAllCards()
        )

    buildDropdownItem = () =>{
        const decks = this.state    
        this.setState(
                (prevState) => ({decks: prevState.decks}),
                ()=> this.getDecks()
            )
            return decks
        }



    render() {
        const { cards, decks, chosenDeck } = this.state
        return (
            <div className="wrapper browse-cards">
                <h2>View All Cards</h2>
                <section className="deck-viewer">
                    {
                        decks.map((deck=>(
                            <DisplayBoard
                                key={deck._id}
                            >
                                <h3>{deck.name}</h3>
                                <p>{deck.description}</p>
                            </DisplayBoard>
                        )))
                    }
                </section>
                <section className="content-wrapper">
                    {
                            cards.map((card)=> (
                                <DisplayBoard
                                    key={card._id}
                                    //I want the onClick to pop the card up, and then
                                        //provide option to add to a deck
                                    //for now this just adds it with the onclick
                                    // onClick={()=> this.props.history.push(`/${decks._id}/${card._id}`)}
                                >
                                    <div className="mask flex-col">
                                        <div className="flex-col">
                                            <div className="card-content">
                                                {/* <img src={card.image_source} alt="dummy card using faker" className="dummy-mtg" /> */}
                                                <h3>{card.title}</h3>
                                                
                                                <button
                                                    onClick={
                                                        ()=>this.props.chosenDeck.AddCardToDeck(card)
                                                    }
                                                    
                                                    >Add to Selected Deck</button>
                                            </div> 
                                        </div>
                                    </div>
                                    
                                </DisplayBoard>
                               
                            ))
                        //this is really more for when filter functionality is incorporated
                    }
                    <button onClick = {this.incrementPage}>Get More Cards</button>
                </section>
            </div>
        )
    }
}