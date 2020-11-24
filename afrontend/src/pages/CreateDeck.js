import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import {__CreateDeck} from '../services/DeckServices'

export default class CreateDeck extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            description: ''
        }
    }

    handleChange = ({target}) => {
        this.setState({ [target.name]: target.value})
        //takes what's typed in whatever's named and puts it as the value of relevant field
    }
    
    handleSubmit= async (e) => {
        e.preventDefault()
        try{
            const deck = await __CreateDeck(
                this.state,
                this.props.currentUser._id
                )
            this.props.addDeck(deck)
            this.props.toggleCreateDeck(false)
            this.props.toggleEditDeck(false)
        } catch (error){throw error}
    }

    render() {
        const { name, description } = this.state
        return (
            <div className = "upload content">
                <form 
                    className = "flex-col"
                    onSubmit = {this.handleSubmit}
                >
                    <TextInput 
                        placeholder="Name Your Deck"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <TextInput 
                        placeholder="Describe it"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                    <button>Summon</button>
                </form>

            </div>
        )
    }

}