// NEED TO BE UPDATED AND FIXED
    //INSTALL FAKER
    //INSTALL BCRYPT

const faker = require('faker')
const connection = require('./connection')
const { Types } =require('mongoose')
const { User, MTGCard } = require('./schema')
const bcrypt = require('bcrypt')
const CARDART = `https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg`

const users = new Array(50).fill().map(()=> ({
    _id: Types.ObjectId(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password_digest: faker.random.word()
}))


// const cards= new Array(500).fill().map(() => ({
//     _id: Types.ObjectId(),
//     // title: `cool`,
//     // rules_text: `yeah sick`
//     title: faker.random.words(Math.floor(Math.random()*5)),
//     rules_text: faker.random.words(Math.floor(Math.random()*15)),
//     MTGCardArt: CARDART
// }))

let testcards = []
    for (let i=0; i < 100; i++) {
        let newTestCard= {
            _id: Types.ObjectId(),
            title: faker.lorem.sentence(),
            image_source: faker.random.image()
        }
        testcards.push(newTestCard)
    }

const seed = async () => {
try {
    await connection.connect
    await User.insertMany(users)
    await MTGCard.insertMany(testcards)
    } catch (error) {
        console.log(error)
    } finally {
        process.exit()
    }
}
seed()