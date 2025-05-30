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
    categoryAlt: {
        type: String,
        default: ""
    }
});

const Movement = mongoose.model('Movement', movementSchema);

export default Movement;