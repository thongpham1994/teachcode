import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const Student =  mongoose.model('Student',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: isEmail,
                message: 'Email is incorrect format'
            }
        },
        languages: {
            type: [String],
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            },
            required: true,
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: phoneNumber => phoneNumber.length > 5 && phoneNumber.length <= 20,
                message: 'Phone number must be least 5 characters, max: 20'
            },
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    }, {
        autoCreate: false,
        autoIndex: true
    })
)
export default Student