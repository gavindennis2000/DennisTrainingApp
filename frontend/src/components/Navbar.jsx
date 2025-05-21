import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Paper, Button, Stack } from '@mui/material';

const buttonWidth = "180px", buttonHeight = "50px";
const buttonCurrentPageColor = '#b3e7ff';



const Navbar = () => {
  const [currentButton, setCurrentButton] = useState('/');

  const handleClick = (path) => {
    setCurrentButton(path);
    console.log(path);
  }

  return (
      <Paper 
        square 
        sx={{
          backgroundColor: 'rgb(245, 252, 255, 0.9)'
        }}
      >
        <div style={{
          margin: '20px', 
          marginLeft: '20px',
          marginRight: '20px',
          paddingTop: '1px',
        }}>
          <h1 style={{marginBottom: "0px"}}>HardGains</h1>
          <p style={{marginBottom: "30px", marginTop: '0px'}}>A Simple Log to Share Training With Your Friends</p>
        </div>

        <Paper square sx={{
          backgroundColor: '#e6f7ff',
        }}>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" onClick={() => { handleClick("/") }} sx={{
              minWidth: buttonWidth,
              minHeight: buttonHeight,
              backgroundColor: currentButton == "/" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>Home</Button>
            <Button component={Link} to="/login" onClick={() => { handleClick("/login") }} sx={{
              minWidth: buttonWidth,
              minHeight: buttonHeight,
              backgroundColor: currentButton == "/login" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>Log in</Button>
            <Button component={Link} to="/register" onClick={() => { handleClick("/register") }} sx={{
              minWidth: buttonWidth,
              minHeight: buttonHeight,
              backgroundColor: currentButton == "/register" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>Create Account</Button>
            <Button component={Link} to="/about" onClick={() => { handleClick("/about") }} sx={{
              minWidth: buttonWidth,
              minHeight: buttonHeight,
              backgroundColor: currentButton == "/about" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>About</Button>
          </Stack>
        </Paper>
        <Paper square sx={{
          backgroundColor: '#b3e7ff',
          minHeight: '10px'
        }}>
          <Stack direction="row" spacing={6}>
          </Stack>
        </Paper>
      </Paper>
  )
}

export default Navbar