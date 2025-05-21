import React from 'react'

const Footer = () => {
  return (
    <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px', // or adjust as needed
          padding: '0 20px',
        backgroundColor: '#b3e7ff',
          color: 'gray',
          fontSize: '14px',
        }}>
          <div>HardGains Training Log</div>
          <div>Created by Brandon and Gavin Dennis</div>
    </div>
  )
}

export default Footer