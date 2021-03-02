const { Schema } = require('mongoose')

module.exports = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password_digest: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        decks: [{
            type: Schema.Types.ObjectId,
            ref: 'decks'
        }]
    }, 
    { timestamps: true }
)