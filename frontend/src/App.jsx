import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './CreatePage';
import Home from './Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createPage" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
