import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, About, Register, Home } from './pages';
import { Navbar, Footer } from './components';
import { createTheme, CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'; // <-- fixed import

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [user, setUser] = useState("")

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <div style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '0px',
          marginBottom: '10px',
        }}>
          <Navbar user={user} />
          <Paper square sx={{
              backgroundColor: 'rgba(245, 252, 255, 0.9)',
          }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/Login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/Register" element={<Register user={user} setUser={setUser} />} />
              <Route path="/About" element={<About />} />
            </Routes>

            <Footer />

          </Paper>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
