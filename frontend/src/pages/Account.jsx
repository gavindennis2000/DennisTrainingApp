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

    // fix the formatting of the account creation date
    if (user.loggedIn) {
        const date = user?.accountCreated ? new Date(user.accountCreated) : null;
        if (date && !isNaN(date)) {
            readableDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',   // "May"
                day: 'numeric',
            });
            readableTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
        }
    }
    
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
                Account Created: {readableDate}, {readableTime}
            </Stack>
        </div>
    )
}

export default Account