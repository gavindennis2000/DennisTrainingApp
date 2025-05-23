import React from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = ({user, setUser, setCurrentPage}) => {
  const handleSubmit = async () => {

  }
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
          />
          <TextField
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
        <h2>Forgot your password?</h2>
        <Link to={"/reset-password"} style={{ textDecoration: 'none' }}>
          <p onClick={() => { setCurrentPage("/reset-password") }}>Click here to reset your password</p>
        </Link>
      </div>
  )
}

export default Login 