import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Account = ({user, setUser}) => {
    let readableDate = "", readableTime = "";

    // don't let users on this page if they're not logged in
    const navigate = useNavigate();
    useEffect( () => {
        if (!user.loggedIn) {
            navigate('/');
        }
    }, [user.loggedIn]);

    return (
        <div style={{
            margin: '20px', 
            marginLeft: '20px',
            marginRight: '20px',
            paddingTop: '5px'
        }}>
            <h2>Account Information</h2>
            <Stack>
                Username: {user.username}
                <br />
                Name: {user.firstName} {user.lastName} 
                <br />
                Account Created: {user.accountCreated.month}-{user.accountCreated.day}-{user.accountCreated.year}
            </Stack>
        </div>
    )
}

export default Account