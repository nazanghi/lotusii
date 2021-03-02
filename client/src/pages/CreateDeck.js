import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import {__CreateDeck} from '../services/DeckServices'

export default class CreateDeck extends Component {
    constructor () {
        super()
        this.state =  {
            title: '',
            description: '',
        }
    }
// TODO create an AddDeck and toggleCreateDeck
    

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const deck = await __CreateDeck(
                this.state,
                this.props.currentUser._id
            )
            this.props.addDeck(deck)
            this.props.toggleCreateDeck(false)
            console.log('CreateDeck HandleSubmit hits')
        } catch (error){
            console.log('CreateDeck HandleSubmit fails')
            throw error
        }
    }

    render () {
        const { title, description } = this.state
        return (
            <div className = "upload-content">
                <form 
                    className = "flex-col"
                    onSubmit = {this.handleSubmit}
                >
                    <TextInput
                        placeholder = "Name Your Deck"
                        name = "title"
                        value = {title}
                        onChange = {this.handleChange}
                    />
                    <TextInput
                        placeholder = "Describe It"
                        name = "description"
                        value = {description}
                        onChange = {this.handleChange}
                    />
                    <button>Summon</button>

                </form>
            </div>
        )
    }
}