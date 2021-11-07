const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    id: {
        type: String,
        required: [true, 'Service must have an Id']
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
        type: String,
        required: [true, 'Service must have a address']
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
        type: String,
        required: [true, 'Service must have a zipCode']
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