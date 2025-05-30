import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Movement = mongoose.model('Movement', movementTemplateSchema);

export default Movement;