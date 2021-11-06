const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Skill must have a name']
    },
    category: {
        type: String,
        required: [true, 'Skill must fall under a category']
    },
    description: {
        type: String,
        required: [true, 'Skill must have a description']
    }
});

module.exports = mongoose.model('Skill', skillSchema);