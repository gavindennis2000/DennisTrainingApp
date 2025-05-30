import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import { Add, ArrowBack, ArrowForward, Delete, DeleteOutline, FileCopyOutlined, SaveAs, Star, StarBorder } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const TrainingLog = ({user}) => {
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
          <h2>Welcome, {user.firstName ? user.firstName : "TestUser"} !</h2>
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
                      defaultValue={"Upper Body Workout A"}
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
              {workouts.map((exercise, exerciseIndex) => (
                <React.Fragment key={exerciseIndex}>
                  {exercise.sets.map((set, setIndex) => (
                    <TableRow key={`${set.id}`}>
                      <TableCell sx={{backgroundColor: tableCellColor[exerciseIndex % 2]}}>
                        
                        {setIndex === 0 ? 
                          <TextField 
                            defaultValue={exercise.exercise}
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
                          defaultValue={set.weight}
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
                          defaultValue={set.reps}
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
                            {workouts[exerciseIndex].sets[setIndex].pr ? <Star /> : <StarBorder />}
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