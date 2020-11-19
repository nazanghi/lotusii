const { Schema, Types } = require('mongoose')

module.exports = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        MtgCardIds: [{
            type: Schema.Types.ObjectId,
            ref: 'MTGCard'
        }] 
    }, {timestamps: true}
)