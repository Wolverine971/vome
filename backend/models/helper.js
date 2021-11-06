const mongoose = require('mongoose');
const { Schema } = mongoose;

const helperSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Helpers must register']
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    veteranshelping: [{
        type: Schema.Types.ObjectId,
        ref: 'Veteran'
    }]
});

module.exports = mongoose.model('Helper', helperSchema);