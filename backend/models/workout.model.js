import mongoose from "mongoose";

const date = new Date();
const simpleDate = {
  year: date.getFullYear(),
  month: date.getMonth() + 1, // JS months are 0-based
  day: date.getDate()
};

const workoutSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    date: {
        type: Object,
        default: simpleDate,
    },
    bodyweight: {
        type: String,
        default: ""
    },
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;