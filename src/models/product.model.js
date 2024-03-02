import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    }
}, { timestamps: true });

export const Products = mongoose.model("Product", productSchema);

