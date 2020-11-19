const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const getToken =(request, response, next) => {
    console.log('getToken hits')
    const token = request.headers['authorization'].split(' ')[1]
    response.locals.token = token
    next()
}

const verifyToken = (request, response, next) => {
    console.log(`verifyToken hits`)
    let token = response.locals.token
    jwt.verify(token, secretKey, (error, t) => {
        if (error) {
            return response.status(401).json({ message: `unauthorized` })
        }
        return next()

    })
}

const createToken = (request, response) => {
    console.log(`createToken hits`)
    const token = jwt.sign(response.locals.payload, secretKey)
    response.send({ user: response.locals.payload, token })
}

module.exports ={
    createToken,
    verifyToken,
    getToken
}