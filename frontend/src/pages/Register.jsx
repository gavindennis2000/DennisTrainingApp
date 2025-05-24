import React, { useState, useEffect } from 'react'
import { Alert, Button, IconButton, Snackbar, Stack, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAccountStore } from '../store/account';
import { useNavigate } from 'react-router-dom';

const Register = ({user, setUser, setCurrentPage}) => {
  const initialAccount = {
    username: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  
  const [newAccount, setNewAccount] = useState(initialAccount);

  const [error, setError] = useState({
    username: false,
    password: false,
    repeatPassword: false,
    firstName: false,
    lastName: false,
    email: false,
  })

  const [open, setOpen] = useState(false);  // for notficiations
  const [notification, setNotification] = useState("");

  const { createAccount } = useAccountStore()

  const handleSubmit = async() => {
    const {success, message} = await createAccount(newAccount)
    console.log("Success:", success, " Message:", message);

    // set all the error messages to false
    const newError = {...error};
    for (const key in newAccount) {
      if (newAccount[key] === '') {
        newError[key] = true;
      }
      else {
        newError[key] = false;
      }
    }

    // get the notification message
    switch(message) {
      case "invalid username":
        setNotification("Invalid username. Must be 5–10 characters and contain only letters and numbers.")
        setError({...newError, username: true})
        break;
      case "invalid password":
        setNotification("Invalid password. Must be 5-20 characters and contain only letters, numbers, and the following symbols: ` ! @ # $ % ^ & * ( ) _ + - = [ ] { }.")
        setError({...newError, password: true, repeatPassword: true})
        break;
      case "passwords don't match":
        setNotification("Passwords do not match. Please try again.")
        setError({...newError, password: true, repeatPassword: true})
        break;
      case "missing information":
        setNotification("Please fill out all required fields before submitting.")
        setError({...newError});
        // check everything that isn't filled out
        for (const accountItem in newAccount) {
            if (error.hasOwnProperty(accountItem)) {
              error.accountItem = (newAccount.accountItem == '') ? true : false;
            }
        }
        break;
      case "success":
        alert("Account successfully created!");
        setUser({
          loggedIn: true,
          username: newAccount.username,
          firstName: newAccount.firstName,
          lastName: newAccount.lastName, 
          email: newAccount.email,
        });
        setNewAccount(initialAccount);
        setError({...newError});
        break;
      case "can't create":
        setNotification("The username or email address is already in use.")
        setError({...newError});
        break;
      default:
        setNotification("Something went wrong. Try again.");
        break;
    }
    // display a notification
    setOpen(true);
  };

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) 
      return;
    navigate('/');
    setCurrentPage('/');
  }, [user]);


  return (
    <div style={{
        margin: '20px', 
        marginLeft: '20px',
        marginRight: '20px',
        paddingTop: '5px'
      }}>
        <h2>Account Registration</h2>
        <h3>Username and Password</h3>
        <Stack spacing={2}>
          <TextField
            id="username"
            error={error.username}
            label="Username"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
            defaultValue=""
          />
          <TextField
            id="password"
            error={error.password}
            label="Password"
            type="password"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
          />
          <TextField
            id="repeatPassword"
            error={error.repeatPassword}
            label="Repeat Password"
            type="password"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, repeatPassword: e.target.value})}
          />
          <h3>Personal Information</h3>
          <TextField
            id="firstName"
            error={error.firstName}
            label="First Name"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, firstName: e.target.value})}
          />
          <TextField
            id="lastName"
            error={error.lastName}
            label="Last Name"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, lastName: e.target.value})}
          />
          <TextField
            id="email"
            error={error.email}
            label="Email Address"
            variant="filled"
            onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
          />
          <Button onClick={handleSubmit}>
            Submit
          </Button>
          <Snackbar 
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            action={action}
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
        </Stack>
      </div>
  )
}

export default Register