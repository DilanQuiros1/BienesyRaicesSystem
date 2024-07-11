import "./App.css";
import Header from "./Pages/Header";
import Main from "./Pages/Main";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SimpleBar from 'simplebar-react';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './helpers/index';
import Cover from './components/Cover';
import Main2 from './components/Main';

function App() {
 return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Main2 />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
