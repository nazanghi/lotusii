// this is the big boy
import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Nav from './Nav'
import SignInUser from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import {__CheckSession, __GetProfile } from '../services/UserServices'
import {__GetDecks, __GetSingleDeck, __UpdateDeckInfo } from '../services/DeckServices'
import LandingPage from '../pages/LandingPage'
import Home from '../pages/Home'

class Router extends Component {
    constructor (){
        super()
        this.state = {
            authenticated: false,
            currentUser: null,
            pageLoading: true
        }
    }

    componentDidMount () {
        this.verifyTokenValid()
        this.setState({pageLoading: false})
    }

    verifyTokenValid = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const session = await __CheckSession()
                console.log('session', session)
                this.setState(
                    {
                        currentUser: session.user,
                        authenticated: true
                    },
                    () => this.props.history.push('/')
                )
            } catch (error) {
                this.setState({
                    currentUser: null,
                    authenticated: false
                })
            }
        }
    }

    toggleAuthenticated = (value, user, done) => {
        this.setState ({
            authenticated: value,
            currentUser: user
            }, ()=> done()
        )
    }

    render () {
        return (
            <div>
                <Nav
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                />
                <main>
                    {this.state.pageLoading ? (
                        <h4>Summoning...</h4>
                    ) : (
                        <Switch>
                            <Route 
                                exact path= "/"
                                component = {()=> (
                                    <LandingPage>
                                        <Home/> 
                                        {/* You aren't nesting anything in Home, so it's a self-closing tag. */}
                                    </LandingPage>
                                )}
                            />
                        <Route
                            exact path = "/register"
                            component = {(props)=> (
                                <LandingPage>
                                    <SignUp 
                                        {...props}
                                    />
                                </LandingPage>
                            )}
                        />
                        <Route
                            exact path = "/login"
                            component = {(props)=> (
                                <LandingPage>
                                    <SignInUser 
                                        toggleAuthenticated={this.toggleAuthenticated}
                                        {...props}
                                    />
                                </LandingPage>
                            )}
                        />
                        </Switch>
                    )}
                </main>
            </div>
        )
    }
}

export default withRouter(Router)