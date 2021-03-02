const { Schema, Types } = require('mongoose')

module.exports = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        user_id: {
            type:Schema.Types.ObjectId,
            ref: "users"
        },
        cards: [{
            type: String
        }],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comments'
            }
        ]
    }, 
    { timestamps: true }
)