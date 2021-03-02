import React from 'react'
import { Link } from 'react-router-dom'

export default  () => {
    return (
        /**
         * I'm considering an additional div for an image
         * cycling cards or something
         * 
         */
        <div className = "hero-layout">
            <div className = "hero-message">
                <h1>Lotus</h1>
                <h3>A Magic The Gathering Deckbuilder</h3>
            </div>
            <div className = "hero-action">
                <p>Browse Decks</p>
                {/* Create a deck browsing link */}
                <p>or</p>
                <p>Create Your Own</p>
                {/* Create a sign-in link */}
            </div>
        </div>
    )
}