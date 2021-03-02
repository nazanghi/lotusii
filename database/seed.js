const faker = require('faker')
const connection = require('./connection')
const { Types } = require('mongoose')
const { User } = require('./schema')
const bcrypt = require('bcrypt')

const users = new Array(50).fill().map(()=> ({
    _id: Types.ObjectId(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`, 
    email: faker.internet.email(), 
    password_digest: faker.internet.password(), 
    username: faker.internet.userName()
}))

const seed = async () => {
try {
    await connection.connect
    await User.insertMany(users)
    } catch (error) {
        console.log(`Seeding Error! It's : ${error}`)
    } finally {
        process.exit()
    }
}
seed()