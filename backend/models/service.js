const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'Service must have a name']
    },
    category: {
        type: String,
        required: [true, 'Service must fall under a category']
    },
    description: {
        type: String,
        required: [true, 'Service must have a description']
    },
    coordinates: {
        type: [String],
        required: [true, 'Service must have a coordinates']
    },
    address: {
        type: String
    },
    city: {
        type: String,
        required: [true, 'Service must have a city']
    },
    state: {
        type: String,
        required: [true, 'Service must have a state']
    },
    zipCode: {
        type: String
    },

    dateCreated: {
        type: Date,
        required: [true, 'Service must have a dateCreated']
    },
    dateModified: {
        type: Date,
        required: [true, 'Service must have a dateModified']
    },

});

module.exports = mongoose.model('Service', serviceSchema);