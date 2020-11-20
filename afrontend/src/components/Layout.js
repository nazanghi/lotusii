import React from 'react'
import Nav from './Nav'

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


//Doublechecked, good for now
//not entirely sure how to implement
//feel that this will take the children passed down and border around it 