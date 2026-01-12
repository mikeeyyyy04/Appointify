import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
    name: String,
    serving: Number,
    owner: mongoose.Types.ObjectId,
    available: Boolean
})

clinicSchema.index({ name: 'text' })

export const Clinic = mongoose.model('Clinic', clinicSchema)