/* 
training.js

api calls for logging in, registering, and deleting account
*/

import express from 'express';
import Movement from '../models/movement.model.js';
import Set from '../models/set.model.js';
import Workout from '../models/workout.model.js';
import WorkoutMovement from '../models/workoutMovement.model.js';

const trainingRouter = express();
trainingRouter.use(express.json());

// handle workouts
trainingRouter.post("/workout", async (req, res) => {
    // create a new workout for a user

    const { userID, bodyweight, date } = req.body;
    
    if (!userID) {
        return res.status(400).json({ success: false, message: "missing userID" });
    }

    const newDate = new Date();

    try {
        const newWorkout = new Workout({
            userID, 
            bodyweight, 
            date
        });

        await newWorkout.save();
        res.status(201).json({ success: true, data: newWorkout });
    } catch (error) {
        console.error("Error in create account:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

trainingRouter.get("/workout", async (req, res) => {
    // get all workouts from a given user id

    try {
        const { userID } = req.query;

        const workouts = await Workout.find({ userID })

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// trainingRouter.delete("/workout/:id", async (req, res) => {
//     // deletes every exercise and set in workout
    
//     const {id} = req.params;

//     try {
//         await Set.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "set deleted" });
//     } catch (error) {
//         res.status(404).json({ success: false, message: "set not found" });
//     }
// });

// handle movements
trainingRouter.post("/movement", async (req, res) => {
    // create a new movement
    const { name, category, categoryAlt } = req.body;
    
    if (!name || !category) {
        return res.status(400).json({ success: false, message: "missing component" });
    }

    try {
        const newMovement = new Movement({
            name,
            category,
            categoryAlt
        });

        await newMovement.save();
        res.status(201).json({ success: true, data: newMovement });
    } catch (error) {
        console.error("Error creating movement:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

trainingRouter.get("/movement", async (req, res) => {
    res.json({ success: true, message: `got the body ${req.body}`});
});

// handle workout movements
trainingRouter.post("/workoutmovement", async (req, res) => {
    // create a new movement
    const { workoutID, movementID, order } = req.body;
    
    if ( !workoutID || !movementID || !order ) {
        return res.status(400).json({ success: false, message: "missing component" });
    }

    try {
        const newWorkoutMovement = new WorkoutMovement({
            workoutID, 
            movementID, 
            order
        });

        await newWorkoutMovement.save();
        res.status(201).json({ success: true, data: newWorkoutMovement });
    } catch (error) {
        console.error("Error creating workout movement:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

trainingRouter.get("/workoutMovement", async (req, res) => {
    // get all exercises from a given user id

    try {
        const { userID } = req.query;

        const workouts = await Workout.find({ userID })

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// handle sets
trainingRouter.post("/set", async (req, res) => {
    // create a new movement
    const { userID, exerciseMovementID, weight, reps, pr, order } = req.body;
    
    if ( !exerciseMovementID || !order ) {
        return res.status(400).json({ success: false, message: "missing component" });
    }

    try {
        const newSet = new Set({
            userID,
            exerciseMovementID, 
            weight, 
            reps, 
            pr,
            order,
        });

        await newSet.save();
        res.status(201).json({ success: true, data: newSet });
    } catch (error) {
        console.error("Error creating workout movement:", error.message);
        res.status(500).json({ success: false, message: "can't create" });
    }
});

trainingRouter.get("/set", async (req, res) => {
    // get all sets from an exercise movement in a user's workout

    try {
        const { exerciseMovementID } = req.query;

        const sets = await Set.find({ exerciseMovementID })

        res.status(200).json(sets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

trainingRouter.get("/setAll", async (req, res) => {
    // get all sets from all users workouts

    try {
        const { userID } = req.query;

        const sets = await Set.find({ userID });

        res.status(200).json(sets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

trainingRouter.delete("/set/:id", async (req, res) => {
    // deletes a single set

    const {id} = req.params;

    try {
        await Set.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "set deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "set not found" });
    }
});

export default trainingRouter;
