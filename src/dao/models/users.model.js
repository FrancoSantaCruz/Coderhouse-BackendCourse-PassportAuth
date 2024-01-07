import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Carts"
    },
    date: {
        type: Date,
        default: Date.now
    },
    from_github:{
        type: Boolean,
        default: false
    },
})

export const userModel = model('Usuario', userSchema)