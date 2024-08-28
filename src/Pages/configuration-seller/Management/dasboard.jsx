import "./Styles/dasboard.css"; // Archivo CSS para estilos personalizados
import axios from "axios";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [totalProperties, SetTotalProperties] = useState(false);
  const [totalSellers, SetTotalSellers] = useState(false);
  const [totalClients, SetTotalClients] = useState(false);
  const [totalUsers, SetTotalUsers] = useState(false);
  const getAmountProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/propiedades/count"
      );

      SetTotalProperties(response.data.count);
      console.log("contador: ", response.data.count);
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };
  const getAmountUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios/count");

      SetTotalUsers(response.data.count);
      console.log("contador: ", response.data.count);
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };
  const getAmountSellers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/usuarios-seller/count"
      );

      SetTotalSellers(response.data.count);
      console.log("contador: ", response.data.count);
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };
  const getAmountClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/usuarios-client/count"
      );

      SetTotalClients(response.data.count);
      console.log("contador: ", response.data.count);
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };

  useEffect(() => {
    getAmountProperties();
    getAmountUsers();
    getAmountSellers();
    getAmountClients();
  }, []);
  return (
    <div className="dashboard" id="dashboard-section">
      <div className="card blue" style={{ width: "230px" }}>
        <div className="card-content">
          <h2>
            {totalProperties} <i className="bi bi-houses"></i>
          </h2>
          <p>Propiedades Totales</p>
        </div>
        <div className="card-icon">
          <i className="fas fa-user-plus"></i>
        </div>
      </div>

      <div className="card green" style={{ width: "230px" }}>
        <div className="card-content">
          <h2>
            {totalSellers} <i className="bi bi-person-rolodex"></i>
          </h2>
          <p>Total Vendedores</p>
        </div>
        <div className="card-icon">
          <i className="fas fa-female"></i>
        </div>
      </div>

      <div className="card orange" style={{ width: "230px" }}>
        <div className="card-content">
          <h2>
            {totalClients} <i className="bi bi-person-check"></i>
          </h2>
          <p>Total Clientes</p>
        </div>
        <div className="card-icon">
          <i className="fas fa-male"></i>
        </div>
      </div>

      <div className="card red" style={{ width: "230px" }}>
        <div className="card-content">
          <h2>
            {totalUsers} <i className="bi bi-people-fill"></i>
          </h2>
          <p>Usuarios Totales</p>
        </div>
        <div className="card-icon">
          <i className="fas fa-child"></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
