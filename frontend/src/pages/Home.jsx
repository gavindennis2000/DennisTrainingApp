import { Button, Paper } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react'

const Home = ({user}) => {
  var date = new Date();
  const currentDay = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // add 1 to make it 1-based (Jan = 1)
    day: date.getDate(),
  };
  const [day, setDay] = useState(currentDay);
  console.log("currentDay:", currentDay, "day:", day);

  return (
    <div style={{
      margin: '20px', 
      marginLeft: '20px',
      marginRight: '20px',
      paddingTop: '5px'
    }}>
      {user.loggedIn ? /* if user isn't logged in, just show a welcome */ (
        <>
          <h2>Welcome to HardGains! Log in to start logging your training.</h2>
        </>
      ) : ( /* if user is logged in, show the training log */
        <>
          <h2>Welcome, {user.firstName ? user.firstName : "TestUser"} !</h2>
          <Button>
            <ArrowBackIcon />
          </Button>
          {day === currentDay ? "Today" : `${day.month}-${day.day}-${day.year}` }
          <Button>
            <ArrowForwardIcon />
          </Button>
        </>
      )}
      
    </div>
  )
}

export default Home