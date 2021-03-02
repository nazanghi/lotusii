//Review 
//create checkSession
const { User } = require('../database/schema')
const { generatePassword, checkPassword } = require('../middleware/PasswordHandler')
const jwt = require('jsonwebtoken')


const GetUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.user_id).populate('decks')
        console.log('UserController: GetUser hits')
        response.send({ user })
    } catch (error) {
        console.log('UserController: GetUser fails')
        throw error
    }
}

const GetAllUsers = async (request, response) => {
    try {
        const users = await User.find(request) //do I need request or empty?
        response.send ({ users})
    } catch (error) {
        throw error
    }
}

const CreateUser = async (request, response) => {
    try {
        const body = request.body
        const password_digest = await generatePassword(body.password)
        const user = new User ({
            name: body.name,
            email: body.email,
            username: body.username,
            password_digest
        })
        user.save()
        console.log('UserController: CreateUser hits.')
        response.send(user)
    } catch (error) {
        console.log('UserController: CreateUser fails')
        throw error
    }
}

const LoginUser = async (request, response, next) => {
    console.log(`Signing in user id: ${request}`)
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user && (await (request.body.password, user.password_digest))) {
            console.log('UserController: LoginUser hits, good pass')
            const payload = {
                _id: user._id,
                name: user.name,
                username: user.username
            }
            response.locals.payload = payload
            return next()
        }
        console.log('UserController: LoginUser hits, bad pass')
        (response.status(401).send({ message: `Wrong password, try again.`}))
    } catch (error) {
        console.log('UserController: LoginUser fails')
        throw error
    }
}

const RefreshSession = (request, response) => {
    try {
        const token = response.locals.token
        response.send ({ user: jwt.decode(token), token: response.locals.token})
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetUser,
    CreateUser,
    LoginUser,
    RefreshSession,
    GetAllUsers
}
