const mongoose = require('mongoose');
const { Schema } = mongoose;

const veteranSchema = new Schema({
    first: {
        type: String,
        required: [true, 'Must have a first name']
    },
    last: {
        type: String,
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    neededservices: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    helpers: [{
        type: Schema.Types.ObjectId,
        ref: 'Helper'
    }]
});

module.exports = mongoose.model('Veteran', veteranSchema);