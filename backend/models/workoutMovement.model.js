import mongoose from "mongoose";

const workoutMovementSchema = new mongoose.Schema({
    workoutID: {
        type: String,
        required: true,
    },
    movementID: {
        type: String,
        default: ""
    },
    order: {
        type: String,
        required: true,
    },
});

const WorkoutMovement = mongoose.model('WorkoutMovement', workoutMovementSchema);

export default WorkoutMovement;