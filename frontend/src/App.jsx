import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, About, Register, Home, NotFound } from './pages';
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
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
      // when the page changes, update the webpage title 
      let pathStr = "";
      switch (currentPage) {
        case "/reset-password":
          pathStr = "Password Reset";
          break;
        default:
          pathStr = currentPage.charAt(1).toUpperCase() + currentPage.slice(2);
          break;
      }
      document.title = (currentPage === "/") ? (user === "") ? `HardGains Training Log` : `HardGains | ${user}` : `HardGains | ${pathStr}`;
    }, [currentPage]);

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
          <Navbar user={user} setUser={setUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Paper square sx={{
              backgroundColor: 'rgba(245, 252, 255, 0.9)',
          }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/Login" element={<Login user={user} setUser={setUser} setCurrentPage={setCurrentPage} />} />
              <Route path="/Register" element={<Register user={user} setUser={setUser} setCurrentPage={setCurrentPage} />} />
              <Route path="/About" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />

          </Paper>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
