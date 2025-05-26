import React, { useState, useEffect } from 'react'
import { Alert, Box, Button, IconButton, Snackbar, Stack, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import { useAccountStore } from '../store/account'

const Login = ({user, setUser}) => {
  const [loginUser, setLoginUser] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const [open, setOpen] = useState(false);  // for notifications
  const [notification, setNotification] = useState("");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  }
  const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

  const { loginAccount } = useAccountStore();

  const handleSubmit = async () => {
    const {success, message, user} = await loginAccount(loginUser);
    console.log("Success", success, "Message", message, "User:", user);

    switch (message) {
      case "Missing username or password":
        setNotification("Missing username or password.")
        break;
      case "invalid username/password":
        setNotification("Incorrect username or password. Please try again.");
        break;
      default:
        setUser({
          loggedIn: true,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountCreated: user.accountCreated,
          trainingPosts: user.trainingPosts,
          profilePicture: user.profilePicture,
        });
        setNotification("Log in successful!");
        // alert("Log in successful!");
        break;
    }
    setOpen(true);
  }

  const navigate = useNavigate();

  // make sure logged in users can't be on this page
  useEffect(() => {
    if (user.loggedIn) 
      navigate('/');
  }, [user.loggedIn]);

  return (
    <div style={{
        margin: '20px', 
        marginLeft: '20px',
        marginRight: '20px',
        paddingTop: '5px'
    }}>
      <h2>Login</h2>
      <Stack spacing={2}>
        <TextField
          id="filled-password-input"
          label="Username"
          // type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setLoginUser({...loginUser, usernameOrEmail: e.target.value})}
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setLoginUser({...loginUser, password: e.target.value})}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
      <h2>Forgot your password?</h2>
      <Link to={"/reset-password"} style={{ textDecoration: 'none' }}>
        <p onClick={() => { setCurrentPage("/reset-password") }}>Click here to reset your password</p>
      </Link>
      {/* // snackbar toasts */}
      <Snackbar
        open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login 