import mongoose from "mongoose";
let mongooseHidden = require('mongoose-hidden')()

const userSchema  = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, hidden: true },
    created_at: Date,
    tokens: { type: [String], index: true, hidden: true }
})

userSchema.plugin(mongooseHidden, { hidden: { _id: false, password: true, tokens: true } })

export const User = mongoose.model('User', userSchema)