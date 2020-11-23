import React, {Component} from 'react'
import TextInput from '../components/TextInput'
import {__GetSingleDeck, __UpdateDeckInfo} from '../services/DeckServices'

export default class UpdateDeck extends Component {
    constructor(props) {
        super(props)
        this.state= {
            name : '',
            description:'',
            MtgCardIds: []
        }
    }

    componentDidMount() {
        this.getDeck()
    }

    getDeck = async () => {
        try{
            const deck = await __GetSingleDeck(this.props.match.params.deck_id)
            this.setState({
                name: deck.name,
                description: deck.description
            
            })
        } catch(error){throw error}
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.name })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await __UpdateDeckInfo(this.state, this.props.match.params.post_id)
            this.props.history.push('/decks')
        }catch(error){throw error}
    }


    render() {
        const {name, description, MtgCardIds} =this.state
        return(
            <div className="upload content">
                <form className="flex-col" onSubmit={this.handleSubmit}>
                    <TextInput 
                        placeholder="Update Deck Name"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <TextInput 
                        placeholder="Update Deck Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                    <button>Update</button>
                </form>
            </div>
        )
    }
}