import { React, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Paper, Button, Stack } from '@mui/material';

const buttonWidth = "180px", buttonHeight = "50px";
const buttonCurrentPageColor = '#b3e7ff';



const Navbar = ({user, setUser}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    if (path === "/logout") {
      // log out the user
      setUser({
        loggedIn: false,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      localStorage.removeItem('storedUser');
      navigate('/');
      return;
    }
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
          <p style={{marginBottom: "30px", marginTop: '0px'}}>A Simple Training Log For Strength Workouts</p>
        </div>

        <Paper square sx={{
          backgroundColor: '#e6f7ff',
        }}>
          <Box display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" onClick={() => { handleClick("/") }} sx={{
              width: buttonWidth,
              height: buttonHeight,
              backgroundColor: location.pathname == "/" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>{user.loggedIn? "Training Log" : "Home" }</Button>
            {/* navbar buttons when user is logged in */}
            {user.loggedIn ? (
              <>
                <Button component={Link} to="/data" onClick={() => { handleClick("/data") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/data" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Data</Button>
                <Button component={Link} to="/account" onClick={() => { handleClick("/account") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/account" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Account</Button>
                <Button component={Link} to="/" onClick={() => { handleClick("/logout") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/logout" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Logout</Button>
                </>
              ) : (
              <>
                {/* navbar buttons when user is not logged in */}
                <Button component={Link} to="/about" onClick={() => { handleClick("/about") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/about" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>About</Button>
                <Button component={Link} to="/login" onClick={() => { handleClick("/login") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/login" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Log in</Button>
                <Button component={Link} to="/register" onClick={() => { handleClick("/register") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: location.pathname == "/register" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Create Account</Button>
                </>
            )}
          </Stack>
          </Box>
        </Paper>
        <Paper square sx={{
          backgroundColor: '#b3e7ff',
          height: '10px'
        }}>
          <Stack direction="row" spacing={6}>
          </Stack>
        </Paper>
      </Paper>
  )
}

export default Navbar