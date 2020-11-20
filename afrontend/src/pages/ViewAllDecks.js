import React, { Component } from 'react'
import DisplayBoard from '../components/DisplayBoard'
import {__GetDecks} from '../services/DeckServices'
//import a style once you've made it

export default class ViewAllDecks extends Component {
    constructor () {
        super()
        this.state = {
            decks: [],
            currentPage: 1
        }
    }
    componentDidMount() {
        this.getDecks()
    }

//make this method
    addDeck = async () => {
        try {} catch (error){throw error}
    }

    toggleCreateDeck = (value) => this.setState({wantsCreateDeck:value})


    getDecks = async () => {
        try {
            const decks = await __GetDecks(this.state.currentPage)
            this.setState({decks: [...this.state.decks, ...decks]})
        } catch (error) {throw error}
    }
    

    render() {
        const { decks } =this.state
        return (
            //the below div had a class of discover 
            <div className= "wrapper">
                <h2>View Your Decks</h2>
                <section className="content-wrapper">
                    {
                        // // getDecks.map((deck) => (
                        // //     <DisplayBoard
                        // //         key={deck._id}
                        // //     >
                        // //         {/* the below div had a class of discover */}
                        // //         <div className="mask flex-col">
                        // //             <div className ="flex-col">
                        // //                 <div className="card-content">
                        // //                     <h3>{deck.name}</h3>
                        // //                     <p>{deck.description}</p>
                        // //                 </div>
                        // //             </div>
                        // //         </div>
                        // //     </DisplayBoard>
                        // ))
                    }
                </section>
            </div>
        )
    }
}