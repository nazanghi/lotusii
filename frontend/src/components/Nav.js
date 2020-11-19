import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Nav.css' 
export default ({ authenticated,currentUser, className }) => {
    return authenticated 
    ? (
        <header className={className}>
            <div className="icon">Welcome Back, {currentUser.name}</div>
            <nav>
                <NavLink 
                    activeClassName="nav-active" to="/">
                        Return Home
                </NavLink>
                <NavLink 
                    activeClassName="nav-active" to="/decks">
                        View Your Decks
                </NavLink>
                <NavLink 
                    activeClassName="nav-active" to="/Discover">
                        View All Cards
                </NavLink>
                <NavLink 
                    activeClassName="nav-active" 
                    to="/"
                    onClick={()=> localStorage.clear()}
                >
                        Sign Out
                </NavLink>
            </nav>
        </header>
    ) : (
        <header className={className}>
            <div className="icon"></div>
            <nav>
                <NavLink activeClassName="nav-active" to="/discover">
                    Browse Cards
                </NavLink>
                <NavLink activeClassName="nav-active" to="/register">
                    Sign Up
                </NavLink>
                <NavLink activeClassName="nav-active" to="/login">
                    Sign In
                </NavLink>
            </nav>
        </header>
    )
}