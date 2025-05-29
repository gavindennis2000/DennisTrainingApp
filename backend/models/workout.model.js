import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    workoutID: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    bodyweight: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;