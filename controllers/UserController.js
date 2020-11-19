//Review 

const { User, Cart } = require('../database/schema')
const { generatePassword, checkPassword } = require('../middleware/PasswordHandler')
const jwt = require('jsonwebtoken')

const GetProfile = async(request, response) => {
    try {
        const user = await User.findById(request.params.user_id).populate('decks')
        const cart = await Cart.find({ user_id: request.params.user_id })
        response.send ({ user, cart})
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
            password_digest
        })
        user.save()
        response.send(user)
    } catch (error) {
        throw error
    }
} 

const SignInUser = async (request, response, next) => {
    console.log(`SignInUser${request}`)
    try {
        const user = await User.findOne({email: request.body.email})
        console.log('usertest'+user)
        if (user &&
            (await (request.body.password, user.password_digest))
        ) 
        console.log('works after userController line 38', user)
        {
            const payload = {
                _id: user._id,
                name: user.name
            }
            console.log('hits payload', payload)
            response.locals.payload = payload 
            console.log('hits payload response', response)
            return next()
        }
        response.status(401).send({ message: `Wrong Password, try again.`})
    } catch (error) {
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
    GetProfile,
    CreateUser,
    SignInUser,
    RefreshSession
}

//create a checkSession