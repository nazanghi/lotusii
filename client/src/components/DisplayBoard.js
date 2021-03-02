import React from 'react'

export default ({ children, ...rest }) => {
    return (
        <div className="display-board" {...rest}>
            {children}
        </div>
    )
}

//Doublechecked, it's good