import "./App.css";
//import Header from "./Pages/Header";
import MainPageLoad from "./Pages/Home/main-page";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserProfile from "./Pages/Users/profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import Prueba from "../src/Pages/configuration-seller/configuration-seller";
import Main from "./Pages/Main";
import RegisterProperty from "./Pages/configuration-seller/add-property";
import Management from "./Pages/configuration-seller/Management/management";
import EditPropertySeller from "./Pages/configuration-seller/edit-property-seller";
function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPageLoad />} />
        <Route path="Prueba" element={<ProtectedRoute element={Prueba} />} />
        <Route path="MainProperty" element={<Main />} />
        <Route
          path="/RegisterProperty"
          element={<ProtectedRoute element={RegisterProperty} />}
        />
        <Route
          path="/EditPropertySeller"
          element={<ProtectedRoute element={EditPropertySeller} />}
        />
        <Route
          path="/UserProfile"
          element={<ProtectedRoute element={UserProfile} />}
        />
        <Route path="/Management" element={<Management />} />
      </Route>
    </Routes>
  );
}

export default App;
