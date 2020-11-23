import React, { Component } from 'react'
import DisplayBoard from '../components/DisplayBoard'
import {__GetDecks } from '../services/DeckServices'
import CreateDeck from '../pages/CreateDeck'

//import a style once you've made it




const ViewAllDecks = (props) => {
    return <div> 
        View Your Decks/Select A Deck to Edit
        <button onClick={()=>props.toggleCreateDeck(true)}>Or Create A New One</button>
        <div>
            {props.wantsCreateDeck ?
                <CreateDeck
                    addDeck={props.addDeck}
                    toggleCreateDeck={props.toggleCreateDeck}
                    currentUser={props.currentUser}

            />
            : null }
        </div>
        <div>
        {
            props.decks.map((deck)=> (
                <DisplayBoard key={deck._id} >
                    <div className="mask flex-col" >
                        <div className="card-content">
                            <h3>{deck.name}</h3>
                            <p>{deck.description}</p>
                            <button onClick={()=>this.props.history.push(`edit/${deck._id}`)}>edit this shit</button>
                            
                            {/* I need to have an unordered list appear of all of the cards that are in the deck
                            <ul></ul> 
                            */}
                            <div className="mtgcards-display">
                                {deck.MtgCardIds.length ? (
                                deck.MtgCardIds.map((mtgcard)=>(
                                    <li className="individual-mtgcard" key={mtgcard._id}>
                                        <ul>{mtgcard.title}</ul>
                                    </li>

                                ))

                                ):(
                                    <p>No cards in deck</p>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </DisplayBoard>
            ))
        }
        </div>
    </div>
    
}

export default ViewAllDecks
































// export default class ViewAllDecks extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             decks: [],
//             currentPage: 1
//         }
//     }
//     componentDidMount() {
//         this.getDecks()
//     }

// //make this method
//     addDeck = async () => {
//         try {
//         <CreateDeck/>
//     } catch (error){throw error}
//     }




//     getDecks = async () => {
//         try {
//             const decks = await __GetDecks(this.state.currentPage)
//             this.setState({decks: [...this.state.decks, ...decks]})
//         } catch (error) {throw error}
//     }
    

//     render() {
//         const { decks } =this.state
//         return (
//             //the below div had a class of discover 
//             <div className= "wrapper">
//                 <h2>View Your Decks</h2>
//                 <section className="content-wrapper">
//                     <button onClick={()=>props.toggleCreateDeck(true)}>Make a Deck</button>
//                     {/* the below div is a placeholder for where your CreateDeck will display if the above button is clicked */}
//                     <div>
//                         {this.props.wantsCreateDeck ?
//                             <CreateDeck
//                                 addDeck={this.props.addDeck}
//                                 toggleCreateDeck={this.props.toggleCreateDeck}
//                                 currentUser={this.props.currentUser}
//                             />
//                             : null }
//                     </div>
//                     {
//                         decks.map((deck) => (
//                             <DisplayBoard
//                                 key={deck._id}
//                             >
//                                 {/* the below div had a class of discover */}
//                                 <div className="mask flex-col">
//                                     <div className ="flex-col">
//                                         <div className="card-content">
//                                             <h3>{deck.name}</h3>
//                                             <p>{deck.description}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </DisplayBoard>
//                         ))
//                     }
//                 </section>
//             </div>
//         )
//     }
// }