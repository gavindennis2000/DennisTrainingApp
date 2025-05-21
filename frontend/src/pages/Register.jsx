import React from 'react'
import { Button, Stack, TextField } from '@mui/material'

const Register = () => {
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
            id="filled-password-input"
            label="Username"
            autoComplete="current-password"
            variant="filled"
          />
          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
          <TextField
            id="filled-password-input"
            label="Repeat Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
          <h3>Personal Information</h3>
          <TextField
            id="filled-password-input"
            label="First Name"
            autoComplete="current-password"
            variant="filled"
          />
          <TextField
            id="filled-password-input"
            label="Last Name"
            autoComplete="current-password"
            variant="filled"
          />
          <Button>
            Submit
          </Button>
        </Stack>
      </div>
  )
}

export default Register