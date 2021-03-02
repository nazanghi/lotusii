import React from 'react'
import Nav from './Nav'
import '../styles/globals.css'

export default ({ children, authenticated, currentUser }) => (
    <div>
        <Nav 
            authenticated = {authenticated}
            currentUser = {currentUser}
            className = "header-elevated"
        />
        {children}
    </div>
)



