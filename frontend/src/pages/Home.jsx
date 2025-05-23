import { Paper } from '@mui/material'
import React from 'react'

const Home = ({user}) => {
  return (
    <div style={{
      margin: '20px', 
      marginLeft: '20px',
      marginRight: '20px',
      paddingTop: '5px'
    }}>
      {!user.loggedIn ? (
        <>
          <h2>Welcome to HardGains! Log in to start logging your training.</h2>
        </>
      ) : (
        <>
          <h2>Welcome, {user.firstName}!</h2>
        </>
      )}
      
    </div>
  )
}

export default Home