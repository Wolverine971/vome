import {Schema, model, connect} from 'mongoose';

export interface Veteran extends Document {
    first: string;
    last: string;
    email: string;
    street: string;
    city: string;
    zip: number;
}

const veteranSchema = new Schema<Veteran>({
    first: {
        type: String,
        required: [true, 'Must have a first name']
    },
    last: {
        type: String,
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
        type: String,
    }],
    helpers: [{
        type: String
    }]
});

