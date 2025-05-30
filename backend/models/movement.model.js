import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
    workoutID: {
        type: String,
        required: true,
    },
    movementID: {
        type: String,
        required: true,
    },
    order: {
        type: String,
        required: true,
    },
});

const Movement = mongoose.model('Movement', movementSchema);

export default Movement;