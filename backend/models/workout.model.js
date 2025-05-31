import mongoose from "mongoose";

const newDate = new Date();

const workoutSchema = new mongoose.Schema({
    defaultWorkout: {
        type: Boolean, 
        default: false
    },
    userID: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: JSON.stringify({
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate()
        })
    },
    name: {
        type: String, 
        default: "My Workout"
    },
    bodyweight: {
        type: String,
        default: ""
    },
    exercises: [
        {
            name: String,
            sets: [
                {
                    weight: String, 
                    reps: String,
                    pr: Boolean
                }
            ]
        }
    ],
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;