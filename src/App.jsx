import "./App.css";
import MainPageLoad from "./Pages/Home/main-page";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prueba from "../src/Pages/configuration-seller/configuration-seller";
import Main from "./Pages/Main";
import Footer from './components/Footer';
import SimpleBar from 'simplebar-react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './helpers/index';
import Cover from './components/Cover';
import Main2 from './components/Main';
import RegisterProperty from "./Pages/configuration-seller/add-property";
import EditPropertySeller from "./Pages/configuration-seller/edit-property-seller";

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
          <Route path="Prueba" element={<Prueba />} />
          <Route path="MainProperty" element={<Main />} />
          <Route path="/RegisterProperty" element={<RegisterProperty />} />
          <Route path="/EditPropertySeller" element={<EditPropertySeller />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
