const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
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
    }
});

module.exports = mongoose.model('Service', serviceSchema);