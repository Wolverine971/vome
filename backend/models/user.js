const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first: {
        type: String,
        required: [true, 'Must have a first name']
    },
    last: {
        type: String,
        required: [true, 'Must have a last name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Must have an email']
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    }
})

userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', userSchema);