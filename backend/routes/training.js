/* 
training.js

api calls for logging in, registering, and deleting account
*/

import express from 'express';
import Workout from '../models/workout.model.js';

const trainingRouter = express();
trainingRouter.use(express.json());

// handle workouts
trainingRouter.post("/workout", async (req, res) => {
    // create a new workout for a user

    const { userID, date, name, bodyweight, exercises } = req.body;
    
    if (!userID) {
        return res.status(400).json({ success: false, message: "missing userID" });
    }

    try {
        const newWorkout = new Workout({
            userID, 
            date,
            name,
            bodyweight, 
            exercises,
        });

        await newWorkout.save();
        res.status(201).json({ success: true, data: newWorkout });
    } catch (error) {
        console.error("Error in create account:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

trainingRouter.get("/workout", async (req, res) => {
    // get workout from a given user id and date

    try {
        const { userID, date } = req.query;

        if (!userID || !date) {
            return res.status(400).json({ success: false, message: "missing user or date" });
        }
        console.log("userID:", userID, "date", date)

        const dateStr = JSON.stringify(date);

        const workouts = await Workout.find({ userID, date });

        console.log("matches");
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default trainingRouter;
