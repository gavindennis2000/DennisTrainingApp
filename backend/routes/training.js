/* 
training.js

api calls for logging in, registering, and deleting account
*/

import express from 'express';
import Movement from '../models/movement.model.js';
import Set from '../models/set.model.js';
import Workout from '../models/workout.model.js';
import WorkoutMovement from '../models/workoutMovement.model.js';

const accountsRouter = express();
accountsRouter.use(express.json());


export default accountsRouter;
