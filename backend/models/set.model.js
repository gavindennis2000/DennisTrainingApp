import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    userID: {
        type: String, 
        required: true
    },
    exerciseMovementID: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        default: "0",
    },
    reps: {
        type: String,
        default: "0",
    },
    pr: {
        type: Boolean,
        default: false,
    },
    order: {
        type: String,
        required: true,
    },
});

const Set = mongoose.model('Set', setSchema);

export default Set;