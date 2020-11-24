// this is the big boy
import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Nav from './Nav'
import SignInUser from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import {__CheckSession, __GetProfile } from '../services/UserServices'
import {__DeleteDeck, __GetDecks, __GetSingleDeck, __UpdateDeckInfo } from '../services/DeckServices'
import LandingPage from '../pages/LandingPage'
import Home from '../pages/Home'
import ViewAllDecks from '../pages/ViewAllDecks'
import BrowseCards from '../pages/BrowseCards'
import ProtectedRoute from '../components/ProtectedRoute'
import UpdateDeck from '../pages/UpdateDeck'

class Router extends Component {
    constructor (){
        super()
        this.state = {
            authenticated: false,
            currentUser: null,
            pageLoading: true,
            wantsCreateDeck: false,
            decks: [],
            chosenDeck: null,
            wantsEditDeck: false
        }
    }

    componentDidMount () {
        this.verifyTokenValid()
        this.setState({pageLoading: false})
        this.getDecks()
    }
//AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION
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

//AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION AUTHENTICATION

//STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS 




addDeck=(deck)=> {
    this.setState(prevState=>({
        decks: [...prevState.decks, deck]
    }))
}

getDecks= async (e) =>{
    try{
        const userDecks = await __GetDecks()
        this.setState(
            {
                decks: userDecks.decks
            },
            () => this.setState(prevState=>({
                decks: [...prevState.decks]
            }))
        )
    }catch(error){throw error}
}

chooseDeck = async (deck) => {
    try {
        const selectedDeck = await __GetSingleDeck(deck._id)
        this.setState(()=>(
            {
                chosenDeck: selectedDeck
            }
        ))
        console.log(this.chosenDeck)
    } catch (error) {throw error}
}

//STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS STATE-MODIFYING-FUNCTIONS 

//TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES 


    toggleAuthenticated = (value, user, done) => {
        this.setState ({
            authenticated: value,
            currentUser: user
            }, ()=> done()
        )
    }

    toggleCreateDeck = (value) => this.setState({wantsCreateDeck:value})

    toggleEditDeck = (value) => this.setState({wantsEditDeck:value})


//TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES TOGGLES 


    render () {
        return (
            <div>
                <Nav
                    authenticated={this.state.authenticated}
                    currentUser={this.state.currentUser}
                    //can maybe put chosenDeck in Nav
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

{/*vvvvvvvvvvvvvvvvvvvvv     USER ROUTES    vvvvvvvvvvvvvvvvvvvv*/}
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
{/*^^^^^^^^^^^^^^^^^^^^     USER ROUTES    ^^^^^^^^^^^^^^^^^^^^^^^  */}

{/* vvvvvvvvvvvvvvvvvv      DECK ROUTES    vvvvvvvvvvvvvvvvvvvvvvvv */}
                        <Route 
                            path="/decks"
                            component ={(props)=> (
                                <ViewAllDecks
                                    currentUser={this.state.currentUser}                                    
                                    wantsCreateDeck={this.state.wantsCreateDeck}                                    
                                    wantsEditDeck={this.state.wantsEditDeck}
                                    toggleCreateDeck={this.toggleCreateDeck}
                                    addDeck={this.addDeck}    
                                    decks={this.state.decks}
                                    toggleEditDeck={this.toggleEditDeck}  
                                    {...props}                              
                                />    
                            )}
                        />
                        <ProtectedRoute
                            authenticated={this.state.authenticated}
                            path="/edit/decks"
                            component ={(props)=> (
                                <ViewAllDecks
                                    currentUser={this.state.currentUser}
                                    authenticated={this.state.authenticated}
                                >
                                    <UpdateDeck {...props} currentUser={this.state.currentUser}/>
                                </ ViewAllDecks>
                            )}
                        />


{/* ^^^^^^^^^^^^^^^^^       DECK ROUTES ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
{/* vvvvvvvvvvvvvvvvvv      CARD ROUTES     vvvvvvvvvvvvvvvvvvvvvvvvv */}
                        <Route
                            path="/cards"
                            component={(props)=> (
                                <BrowseCards
                                    {...props}
                                />
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