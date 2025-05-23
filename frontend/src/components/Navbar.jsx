import { React, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Paper, Button, Stack } from '@mui/material';

const buttonWidth = "180px", buttonHeight = "50px";
const buttonCurrentPageColor = '#b3e7ff';



const Navbar = ({user, setUser, currentPage, setCurrentPage}) => {

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleClick = (path) => {
    console.log(path)
    if (path === "/logout") {
      // log out the user
      alert("Successfully logged out.");
      setUser({
        loggedIn: false,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      setCurrentPage("/");
      navigate('/');
      return;
    }
    setCurrentPage(path);
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
          <p style={{marginBottom: "30px", marginTop: '0px'}}>A Simple Training Log to Share With Friends</p>
        </div>

        <Paper square sx={{
          backgroundColor: '#e6f7ff',
        }}>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" onClick={() => { handleClick("/") }} sx={{
              width: buttonWidth,
              height: buttonHeight,
              backgroundColor: currentPage == "/" ? buttonCurrentPageColor : "transparent",
              borderRadius: '0',
            }}>Home</Button>
            {/* navbar buttons when user is logged in */}
            {user.loggedIn ? (
              <>
                <Button component={Link} to="/account" onClick={() => { handleClick("/account") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/account" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Account</Button>
                <Button component={Link} to="/" onClick={() => { handleClick("/logout") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/logout" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Logout</Button>
                <Button component={Link} to="/about" onClick={() => { handleClick("/about") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/about" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>About</Button>
                </>
              ) : (
              <>
                {/* navbar buttons when user is not logged in */}
                <Button component={Link} to="/login" onClick={() => { handleClick("/login") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/login" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Log in</Button>
                <Button component={Link} to="/register" onClick={() => { handleClick("/register") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/register" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>Create Account</Button>
                <Button component={Link} to="/about" onClick={() => { handleClick("/about") }} sx={{
                  width: buttonWidth,
                  height: buttonHeight,
                  backgroundColor: currentPage == "/about" ? buttonCurrentPageColor : "transparent",
                  borderRadius: '0',
                }}>About</Button>
                </>
            )}
          </Stack>
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