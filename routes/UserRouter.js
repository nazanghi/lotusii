const Router = require('express').Router()
const UserController = require('../controllers/UserController')
const User = require('../database/models/User')
const {
    getToken,
    createToken,
    verifyToken
} = require('../middleware/JwtHandler')

Router.get('/:user_id', UserController.GetUser)
Router.get('/', UserController.GetAllUsers)
Router.post('/register', UserController.CreateUser)
Router.post('/login', UserController.SignInUser, createToken)
Router.get(
    '/refresh/session',
    getToken,
    verifyToken,
    UserController.RefreshSession
)
module.exports = Router
