import { Schema, model } from "mongoose";

const productSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const cartSchema = new Schema({
    cart: {
        type: [productSchema],
        default: []
    }
})

export const cartsModel = model('Carts', cartSchema)