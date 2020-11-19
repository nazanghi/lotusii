import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className ="hero flex-col">
            <div className="hero-message">
                <h1>Lotus</h1>
                <h3>A Magic The Gathering Deckbuilder</h3>
                <p>Create a deck, then search for cards to add to them!</p>
            </div>
            <div className="hero-action">
                <Link to="/register">Get Started</Link>
            </div>
        </div>
    )
}
