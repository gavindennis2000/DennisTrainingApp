import { Button, ListSubheader, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import { Add, ArrowBack, ArrowForward, Delete, DeleteOutline, FileCopyOutlined, SaveAs, Star, StarBorder } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import exerciseList from '../components/exerciseList';

const TrainingLog = ({user}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const [date, setDate] = useState(dayjs());
  const [dateIsToday, setDateIsToday] = useState(true);

  const allExercises = exerciseList;

  const defaultWorkout = {
    defaultWorkout: true,
    userID: user.username, 
    date: JSON.stringify({
      year: dayjs().year(), 
      month: dayjs().month() + 1, 
      day: dayjs().date()
    }),
    name: "My Workout",
    bodyweight: "",
    exercises: []
  }
  const [workout, setWorkout] = useState({...defaultWorkout});

  const fetchWorkout = async () => {
    const dateStr = JSON.stringify({
      year: date.year(), 
      month: date.month() + 1, 
      day: date.date()
    });
    const response = await fetch(`/api/training/workout?userID=${user.username}&date=${dateStr}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      setWorkout(defaultWorkout);
      console.log("No workouts returned from api call. Setting to default");
      return;
    }

    // update the workout object
    const dataObj = data[0];
    const newExercises = [...dataObj.exercises];
    setWorkout({
      defaultWorkout: false,
      userID: user.username, 
      date: JSON.parse(dataObj.date),
      name: dataObj.name, 
      bodyweight: dataObj.bodyweight, 
      exercises: newExercises
    });
    console.log("found workout from ", dataObj.date);
  }

  const isFirstRender = useRef(true);

  useEffect( () => {
    if (date.date() === dayjs().date() && date.month() === dayjs().month() && date.year() === dayjs().year()) {
      setDateIsToday(true);
    }
    else {
      setDateIsToday(false);
    }

    // fetch the workout for the date
    if (isFirstRender.current) {
      // skip fetch on first render
      isFirstRender.current = false;
      return;
    }
    fetchWorkout();
  }, [date])

  useEffect( () => {
    if (workout.defaultWorkout)
      return;

    console.log("Workout has changed: ", workout);
  }, [workout]);

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
    console.log("Adding set");
    const newWorkout = {...workout};
    // use the same weight for the added set
    const weight = newWorkout.exercises[exerciseIndex].sets[newWorkout.exercises[exerciseIndex].sets.length - 1].weight;

    const updatedExercise = {
      ...newWorkout.exercises[exerciseIndex],
      sets: [...newWorkout.exercises[exerciseIndex].sets, { weight: weight, reps: "0", pr: false }]
    };

    newWorkout.exercises[exerciseIndex] = updatedExercise;

    setWorkout(newWorkout);
  };

  const handleAddExercise = () => {
    // adds exercise to end of workout array

    const newExercise = {
      name: "New Exercise",
      sets: [
        { weight: "0", reps: "0", pr: false }
      ]
    };

    const newExercises = [...workout.exercises, newExercise];

    const newWorkout = {...workout, exercises: newExercises};
   
    console.log(newWorkout);
  
    setWorkout(newWorkout);
  };

  const handleDeleteSet = (exerciseIndex, setIndex) => {
    // adds set to an exercise
    const newWorkout = {...workout};

    const currentSets = [...newWorkout.exercises[exerciseIndex].sets];
    const updatedSets = [...currentSets.slice(0, setIndex), ...currentSets.slice(setIndex + 1)];

    if (updatedSets.length === 0) {
      newWorkout.exercises.splice(exerciseIndex, 1);
      setWorkout(newWorkout);
    }
    else {
      newWorkout.exercises[exerciseIndex] = {
        ...newWorkout[exerciseIndex],
        sets: updatedSets
      };
      setWorkout(newWorkout);
    }
  };

  // const handleDeleteAll = () => {
  //   // deletes all exercises for current day

  //   // const newWorkout = [...workout];
  //   setWorkout([]);
  // }

  // const handlePR = (exerciseIndex, setIndex) => {
  //   // marks a set as a personal record
  //   const newWorkout = [...workout];

  //   const currentSets = newWorkout[exerciseIndex].sets;

  //   const updatedSet = {
  //     ...currentSets[setIndex],
  //     pr: !currentSets[setIndex].pr
  //   };

  //   const updatedSets = [...currentSets];
  //   updatedSets[setIndex] = updatedSet;

  //   const updatedExercise = {
  //     ...newWorkout[exerciseIndex],
  //     sets: updatedSets,
  //   };

  //   newWorkout[exerciseIndex] = updatedExercise;

  //   // Update the state
  //   setWorkout(newWorkout);
  // }

  const handleChange = (field, exerciseIndex, setIndex, value) => {
    // changes value of workout array when textfield is modified

    const newWorkout = {...workout};

    switch (field) {
      case "weight":
        newWorkout.exercises[exerciseIndex].sets[setIndex] = {...newWorkout.exercises[exerciseIndex].sets[setIndex], weight: value};
        break;
      case "reps":
        newWorkout.exercises[exerciseIndex].sets[setIndex] = {...newWorkout.exercises[exerciseIndex].sets[setIndex], reps: value};
        break;
      case "exercise":
        newWorkout.exercises[exerciseIndex] = {...newWorkout.exercises[exerciseIndex], name: value}
        break;
      case "name":
        newWorkout.name = value;
      default:
        console.log("something went wrong");
        break;
    }

    setWorkout(newWorkout);
    console.log("workout change:", workout);
  }

  return (
    <div style={{
      margin: '20px', 
      marginLeft: '20px',
      marginRight: '20px',
      paddingTop: '5px'
    }}>
          <h2>Welcome, {user.firstName ? user.firstName : "User"} !</h2>
          {/* the date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <Button onClick={() => { gotoPreviousDay() }}>
                <ArrowBack/>
              </Button>
                <DatePicker 
                  disableFuture 
                  label={(dateIsToday) ? `Today` : `${date.format('dddd')}, ${months[date.month()]} ${date.date()}` } 
                  onChange={(newValue) => {
                    if (newValue) {
                      setDate(newValue);
                    }
                  }}
                />
              <Button onClick={ () => !dateIsToday && gotoNextDay() }>
                <ArrowForward sx={dateIsToday ? {color: "gray"} : {}}/>
              </Button>
            </div>
          </LocalizationProvider>

          {/* the table for user's workout */}
          <TableContainer component={Paper} sx={{marginTop: '20px', marginBottom: '40px', marginRight: '0px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{backgroundColor: tableTitleColor}}>
                    <TextField 
                      value={workout.name ? workout.name : "My Workout"}
                      defaultValue={workout.name ? workout.name : "My Workout"}
                      autoWidth
                      onChange={(e) => handleChange("name", -1, -1, e.target.value)}
                      sx={{
                        width: '250px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'transparent', // removes outline
                          },
                        },
                        '& .MuiInputBase-input': {
                          fontWeight: 700, // bold input text
                          height: '10px'
                        }
                      }}
                    />
                  </TableCell>
                  
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableTitleColor}} />
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableTitleColor}} />
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableTitleColor}} />
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableTitleColor}}>
                    { !dateIsToday && (
                      <Tooltip title="Copy workout to today">
                      <Button sx={{marginLeft: '10px', marginRight: '10px'}} onClick={() => ""}>
                        <FileCopyOutlined fontSize='large'/>
                      </Button>
                    </Tooltip>
                    )}
                    <Tooltip title="Save as template">
                      <Button sx={{marginLeft: '10px', marginRight: '10px'}} onClick={() => ""}>
                        <SaveAs fontSize='large'/>
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete all exercises for current day">
                      <Button sx={{marginLeft: '10px', marginRight: '10px'}} onClick={() => handleDeleteAll() }>
                        <DeleteOutline fontSize='large'/>
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{backgroundColor: tableHeaderColor}}><div style={{marginLeft: '14px'}}>Exercise</div></TableCell>
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableHeaderColor}}>Set</TableCell>
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableHeaderColor}}>Weight</TableCell>
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableHeaderColor}}>Reps</TableCell>
                  <TableCell sx={{textAlign: 'center', backgroundColor: tableHeaderColor}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.isArray(workout?.exercises) && workout.exercises.map((exercise, exerciseIndex) => (
                <React.Fragment key={exerciseIndex}>
                  {Array.isArray(exercise.sets) && exercise.sets.map((set, setIndex) => (
                    <TableRow key={`set-${setIndex}`}>
                      <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                        
                        {setIndex === 0 ? 
                          <TextField 
                            value={exercise.name && exercise.name}
                            defaultValue={exercise.name ? exercise.name : "New Exercise"}
                            autoWidth
                            onChange={(e) => handleChange("exercise", exerciseIndex, setIndex, e.target.value)}
                            sx={{
                              width: '200px',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'transparent', // removes outline
                                },
                              }
                            }}
                          /> : ''
                        }
                      </TableCell>
                      <TableCell sx={{textAlign: 'center', backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                          {setIndex + 1}
                      </TableCell>
                      <TableCell sx={{textAlign: 'center', backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                        <TextField 
                          value={set.weight}
                          onChange={(e) => handleChange("weight", exerciseIndex, setIndex, e.target.value)}
                          sx={{
                            width: '100px',
                            '& .MuiInputBase-input': {
                            textAlign: 'center', // can be 'left', 'right', or 'center'
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'transparent', // removes outline
                              },
                            }}
                          }
                        />
                      </TableCell>
                      <TableCell sx={{textAlign: 'center', backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                        <TextField 
                          value={set.reps ? set.reps : "0"}
                          onChange={(e) => handleChange("reps", exerciseIndex, setIndex, e.target.value)}
                          sx={{
                            width: '100px',
                            '& .MuiInputBase-input': {
                            textAlign: 'center', // can be 'left', 'right', or 'center'
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'transparent', // removes outline
                              },
                            }}}
                        />
                      </TableCell>
                      <TableCell sx={{textAlign: 'center', backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                        <Tooltip title="Add set to personal bests">
                          <Button 
                            sx={{marginLeft: '10px', marginRight: '10px'}}
                            onClick={() => handlePR(exerciseIndex, setIndex)}
                          >
                            {workout.exercises[exerciseIndex].sets[setIndex].pr ? <Star /> : <StarBorder />}
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete set">
                          <Button 
                            sx={{marginLeft: '10px', marginRight: '10px'}}
                            onClick={() => handleDeleteSet(exerciseIndex, setIndex)}
                          >
                            <Delete />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={"Add set"}>
                    <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                      <Button onClick={() => handleAddSet(exerciseIndex)}>
                        <Add /> Add Set
                      </Button>
                    </TableCell>
                    <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}} />
                    <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}} />
                    <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}} />
                    <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}} />
                  </TableRow>
                </React.Fragment>
              ))}
              <TableRow key={"New exercise"}>
                <TableCell>
                  <Button onClick={() => handleAddExercise()}>
                    <Add /> Add Exercise
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

export default TrainingLog