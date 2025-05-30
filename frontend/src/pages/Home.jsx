import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import { Add, ArrowBack, ArrowForward, Delete, DeleteOutline, FileCopyOutlined, SaveAs, Star, StarBorder } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Home = ({user}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [date, setDate] = useState(dayjs());
  const [dateIsToday, setDateIsToday] = useState(true);

  const [disabled, setDisabled] = useState(true);

  const [workouts, setWorkouts] = useState([
    {
      exercise: "Bench Press",
      sets: [
        { id: `${Date.now() + Math.random()}`, weight: 135, reps: 5, pr: false},
        { id: `${Date.now() + Math.random()}`, weight: 135, reps: 5,  pr: false},
      ]
    },
  ]);

  const [allWorkouts, setAllWorkouts] = useState([
    {
      name: "My Workout",
      id: `My Workout-${Date.now()}-${Math.random()}`,
      date: Date.now(),
      workout: workouts,
    }
  ])

  useEffect( () => {
    if (date.date() === dayjs().date()) {
      setDateIsToday(true);
    }
    else {
      setDateIsToday(false);
    }
  }, [date])

  // useEffect( () => {
  //   console.log("workouts has changed", workouts);
  // }, [workouts]);

  const gotoPreviousDay = () => {
    const newDate = date.subtract(1, 'day');
    setDate(newDate);
    return;
  }

  const gotoNextDay = () => {
    const newDate = date.add(1, 'day');
    setDate(newDate);
    return;
  }

  // table functions and color stuff
  const tableTitleColor = "#99dfff";
  const tableHeaderColor = "#b3e7ff";
  const tableCellColor = ["#f0faff", "#e6f7ff"];

  const handleAddSet = (exerciseIndex) => {
    // adds set to an exercise
    const newWorkouts = [...workouts];
    // use the same weight for the added set
    const weight = newWorkouts[exerciseIndex].sets[newWorkouts[exerciseIndex].sets.length - 1].weight;

    const updatedExercise = {
      ...newWorkouts[exerciseIndex],
      sets: [...newWorkouts[exerciseIndex].sets, { id: `${Date.now() + Math.random()}`, weight: weight, reps: "0", pr: false }]
    };

    newWorkouts[exerciseIndex] = updatedExercise;

    setWorkouts(newWorkouts);
  };

  const handleAddExercise = () => {
    // adds exercise to end of workout array

    const newExercise = {
      exercise: "New Exercise",
      sets: [
        {id: `${Date.now() + Math.random()}`, weight: "0", reps: "0", pr: false}
      ]
    }   
    const newWorkouts = [...workouts, newExercise];
    console.log(newWorkouts);
  
    setWorkouts(newWorkouts);
  };

  const handleDeleteSet = (exerciseIndex, setIndex) => {
    // adds set to an exercise
    const newWorkouts = [...workouts];

    const currentSets = [...newWorkouts[exerciseIndex].sets];
    const updatedSets = [...currentSets.slice(0, setIndex), ...currentSets.slice(setIndex + 1)];

    if (updatedSets.length === 0) {
      const updatedWorkouts = [
        ...newWorkouts.slice(0, exerciseIndex), 
        ...newWorkouts.slice(exerciseIndex + 1)
      ];
      setWorkouts(updatedWorkouts);
    }
    else {
      newWorkouts[exerciseIndex] = {
        ...newWorkouts[exerciseIndex],
        sets: updatedSets
      };
      setWorkouts(newWorkouts);
    }
  };

  const handleDeleteAll = () => {
    // deletes all exercises for current day

    // const newWorkouts = [...workouts];
    setWorkouts([]);
  }

  const handlePR = (exerciseIndex, setIndex) => {
    // marks a set as a personal record
    const newWorkouts = [...workouts];

    const currentSets = newWorkouts[exerciseIndex].sets;

    const updatedSet = {
      ...currentSets[setIndex],
      pr: !currentSets[setIndex].pr
    };

    const updatedSets = [...currentSets];
    updatedSets[setIndex] = updatedSet;

    const updatedExercise = {
      ...newWorkouts[exerciseIndex],
      sets: updatedSets,
    };

    newWorkouts[exerciseIndex] = updatedExercise;

    // Update the state
    setWorkouts(newWorkouts);
  }

  const handleChange = (field, exerciseIndex, setIndex, value) => {
    // changes value of workouts array when textfield is modified

    const newWorkouts = [...workouts];

    switch (field) {
      case "weight":
        newWorkouts[exerciseIndex].sets[setIndex] = {...newWorkouts[exerciseIndex].sets[setIndex], weight: value};
        break;
      case "reps":
        newWorkouts[exerciseIndex].sets[setIndex] = {...newWorkouts[exerciseIndex].sets[setIndex], reps: value};
        break;
      case "exercise":
        newWorkouts[exerciseIndex] = {...newWorkouts[exerciseIndex], exercise: value}
        break;
      default:
        console.log("something went wrong");
        break;
    }

    setWorkouts(newWorkouts);
    console.log("workout change:", workouts);
  }

  return (
    <div style={{
      margin: '20px', 
      marginLeft: '20px',
      marginRight: '20px',
      paddingTop: '5px'
    }}>
      <h2>Welcome to HardGains! Log in to start logging your training.</h2>
    </div>
  )
}

export default Home