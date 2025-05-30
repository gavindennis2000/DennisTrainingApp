import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    movementID: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
        default: "0",
    },
    reps: {
        type: String,
        required: true,
        default: "0",
    },
    pr: {
        type: Boolean,
        required: true,
        default: false,
    },
    order: {
        type: String,
        required: true,
    },
});

const Set = mongoose.model('Set', setSchema);

export default Set;