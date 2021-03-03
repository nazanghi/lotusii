import React, {Component} from 'react'
import TextInput from '../components/TextInput'
import {__CreateUser} from '../services/UserServices'
// import '../styles/Signup.css'

export default class Signup extends Component {
    constructor () {
        super ()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = ({target}) => {
        this.setState({ [target.name]: target.value})
        console.log('handleChange',this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await __CreateUser(this.state)
            this.props.history.push('/register')
        } catch (error) {throw error}
    }


//  AW SHIT HERE COMES THE BIG ONE
    render() {
        const {name, password, email} = this.state
        return (
            <div className= "signup flex-col">
                <form
                    className= "flex-col"
                    onSubmit={this.handleSubmit}>
                        <TextInput
                            placeholder="Your Email"
                            name="email"
                            value={email}
                            type="email"
                            onChange={this.handleChange}
                        />
                        <TextInput
                            placeholder="Your Name"
                            name="name"
                            value={name}
                            type="text"
                            onChange={this.handleChange}
                        />
                        <TextInput
                            placeholder="Your Password"
                            name="password"
                            value={password}
                            type="password"
                            onChange={this.handleChange}
                        />
                        <button>Sign Up</button>
                    </form>
            </div>
        )
    }

}