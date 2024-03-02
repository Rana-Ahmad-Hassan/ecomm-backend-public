import mongoose, { Schema, model } from "mongoose";

const bestSellerSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
}, { timestamps: true })


export const bestSellerModel = model("bestSeller", bestSellerSchema)