import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        unique: true,
        required: true
    },
    answer: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, { timestamps: true })


export const User = model("user", userSchema)