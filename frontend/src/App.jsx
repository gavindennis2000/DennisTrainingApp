import { Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import About from './pages/About';
// import Home from './pages/Home';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundImage: 'url(/background.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '0px',
          marginBottom: '10px',
        }}>
          <Navbar />
          <Paper square sx={{
              backgroundColor: 'rgba(245, 252, 255, 0.9)',
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
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
