const { Schema } = require('mongoose')

module.exports = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        image_source: {
            type: String,
            required: true
        }
        

    },
    {timestamps: true}
)