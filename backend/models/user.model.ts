import {Schema, model, connect} from '..\mongoose';

export interface User extends Document{

}

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

