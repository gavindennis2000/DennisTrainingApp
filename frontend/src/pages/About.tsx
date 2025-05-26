import React from 'react'
import { Box, Paper } from '@mui/material'

const About = () => {
  return (
    <>
      <div style={{
        margin: '20px', 
        marginLeft: '20px',
        marginRight: '20px',
        paddingTop: '5px'
      }}>
        <h2>Welcome to HardGains!</h2>
      </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '40px', // or adjust as needed
          padding: '0 40px',
          backgroundColor: 'rgb(230, 247, 255, 0.9)', // optional for visibility
          color: '#1976d2',
          fontSize: '14px',
        }}>
          <div>By Gavin Dennis</div>
          <div>Updated May 21, 2025</div>
        </div>
        <div style={{
          margin: '20px', 
          marginLeft: '20px',
          marginRight: '20px',
        }}>
        <Box>
          HardGains is designed to help you log your training and share with friends.
        </Box>
      </div>
    </>
  )
}

export default About