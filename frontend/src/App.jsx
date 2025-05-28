import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import { About, Account, Feed, Home, Login, NotFound, Register, ResetPassword } from './pages';
import { Navbar, Footer } from './components';
import { Alert, createTheme, CssBaseline, IconButton, Snackbar, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { ThemeProvider } from '@mui/material/styles'; // <-- fixed import

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    accountCreated: null,
    trainingPosts: 0,
    profilePicture: "",
  })
  const [notification, setNotification] = useState("");
  const [open, setOpen] = useState(false);

  const previousLogin = useRef(user.loggedIn);

  useEffect(() => {
    if (user.loggedIn !== previousLogin.current) {
      // don't show an alert the first run
      previousLogin.current = user.loggedIn;
      if (user.loggedIn) {
        setNotification("Successfully logged in.");
      } else {
        setNotification("Successfully logged out.");
      }
      setOpen(true);
    }
  }, [user.loggedIn]);


  useEffect(() => {
    // when the page changes, update the webpage title 
    let pathStr = "";
    switch (location.pathname) {
      case "/reset-password":
        pathStr = "Password Reset";
        break;
      default:
        pathStr = location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2);
        break;
    }
    document.title = (location.pathname === "/") ? (!user.loggedIn) ? `HardGains Training Log` : `HardGains | ${user.username}` : `HardGains | ${pathStr}`;
  }, [location.pathname]);

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

  return (
    <ThemeProvider theme={theme}>
      <center>
      <CssBaseline />
      <div>
        <div style={{
          marginLeft: '50px',
          marginRight: '50px',
          marginTop: '0px',
          marginBottom: '10px',
        }}>
          <Navbar user={user} setUser={setUser} />
          <Paper square sx={{
              backgroundColor: 'rgba(245, 252, 255, 0.9)',
          }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/About" element={<About />} />
              <Route path="/Account" element={ <Account user={user} setUser={setUser} /> } />
              <Route path="/Feed" element={<Feed user={user} />} />
              <Route path="/Login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/Register" element={<Register user={user} setUser={setUser} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />

          </Paper>
        </div>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification}
          </Alert>
        </Snackbar>  
      </div>
      </center>
    </ThemeProvider>
  );
}

export default App;
