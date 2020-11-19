import React, { Component } from 'react'
import Card from '../components/Card'
import { __GetCards, __AddCardToDeck } from '../services/CardServices'
import '../styles/Discover.css'
import { __GetSingleDeck } from '../services/DeckServices'


export default class Discover extends Component {
    constructor () {
        super()
        this.state = {
        cards: [],
        chosenDeck: null,
        currentPage: 1
    }
}

    componentDidMount() {
        this.getAllCards()
    }

    getAllCards = async () => {
        try {
            const cards = await __GetCards(this.state.currentPage)
            this.setState({cards: [...this.state.cards, ...cards]})
        } catch (error) {throw error}
    }
    

    addCardToDeck = async (card) => {
        try {
            this.props.history.push(card)            
        } catch (error){throw error}
    }
    incrementPage = () =>
        this.setState(
            (prevstate) => ({ currentPage: prevstate.currentPage ++ }),
            () => this.getAllCards()
        )



    render() {
        const { cards } = this.state
        return (
            <div className="discover wrapper">
                <h2>View All Cards</h2>
                <section className="content-wrapper">
                    {
                            cards.map((card)=> (
                                <Card
                                    key={card._id}
                                    //I want the onClick to pop the card up, and then
                                        //provide option to add to a deck
                                    //for now this just adds it with the onclick
                                    // onClick={()=> this.props.history.push(`/${decks._id}/${card._id}`)}
                                >
                                    <div className="mask flex-col discover">
                                        <div className="flex-col">
                                            <div className="card-content">
                                                {/* <img src={card.image_source} alt="dummy card using faker" className="dummy-mtg" /> */}
                                                <h3>{card.title}</h3>
                                                {/* <p>{card.rules_text}</p> */}
                                                <button
                                                    onClick={()=>this.addCardToDeck(card)}
                                                    >Add to Selected Deck</button>
                                            </div> 
                                        </div>
                                    </div>
                                    
                                </Card>
                               
                            ))
                        //this is really more for when filter functionality is incorporated
                    }
                    <button onClick = {this.incrementPage}>Get More Cards</button>
                </section>
            </div>
        )
    }
}